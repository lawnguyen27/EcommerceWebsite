import React, { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../../../utils/firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    sex: "",
    categoryId: "",
    imageUrl: "",
    quantity: [0, 0, 0, 0, 0], // 5 sizes: S, M, L, XL, XXL
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Thiết lập Axios với Token
  const apiClient = axios.create({
    baseURL: "http://localhost:5077/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Lấy danh sách Category từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/Category");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [apiClient]);

  // Xử lý khi chọn tệp
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const getCategoryId= (name) => {
    var category = categories.find(c=>c.name==name)
   return category.categoryId}
   const getCategoryName= (id) => {
    var category = categories.find(c=>c.categoryId==id)
   return category.name
      }
  // Upload ảnh lên Firebase
  const uploadImageToFirebase = () => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject("No image selected.");
        return;
      }
    
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Image upload failed:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.categoryId ||
      !image ||
      product.quantity.some((q) => q < 0)
    ) {
      alert("Please complete all fields and ensure quantity values are valid.");
      return;
    }

    setLoading(true);

    try {
      // Upload ảnh lên Firebase
      const imageUrl = await uploadImageToFirebase();
      console.log("Uploaded Image URL:", imageUrl);

      // Gửi sản phẩm tới API
      const response = await apiClient.post("/Product", {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        sex: product.sex,
        categoryId: parseInt(product.categoryId),
        imageUrl: imageUrl,
        quantity: product.quantity, // Số lượng của từng size
      });

      alert("Product added successfully!");
      console.log("API Response:", response.data);

      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        sex: "",
        categoryId: "",
        imageUrl: "",
        quantity: [0, 0, 0, 0, 0],
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error );
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Product</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Sex:</label>
        <select
          name="sex"
          value={product.sex}
          onChange={(e) => setProduct({ ...product, sex: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Category:</label>
        <select
  name="categoryId"
  
  onChange={(e) => {
    const selectedValue = getCategoryId(e.target.value);
    setProduct({ ...product, categoryId: selectedValue });
    console.log("Selected Category ID:", selectedValue); // Debug
  }}
>
  <option value="">Select Category</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>

      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Quantity:</label>
        {["S", "M", "L", "XL", "XXL"].map((size, index) => (
          <div key={size}>
            <label>Size {size}:</label>
            <input
              type="number"
              value={product.quantity[index]}
              onChange={(e) => {
                const newQuantities = [...product.quantity];
                newQuantities[index] = parseInt(e.target.value) || 0;
                setProduct({ ...product, quantity: newQuantities });
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button
        onClick={handleAddProduct}
        style={{ marginTop: "10px" }}
        disabled={loading}
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </div>
  );
};

export default ProductForm;
