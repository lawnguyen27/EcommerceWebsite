import React, { useState, useEffect } from "react";
import { storage } from "../../../utils/firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Xử lý khi chọn tệp
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload ảnh lên Firebase Storage
  const handleUpload = () => {
    if (!image) return;
    setLoading(true);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          `Upload is ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}% done`
        );
      },
      (error) => {
        console.error("Upload failed:", error);
        setLoading(false);
      },
      () => {
        // Lấy URL của ảnh đã upload
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at:", url);
          setImage(null);
          fetchImages(); // Refresh danh sách ảnh sau khi upload
          setLoading(false);
        });
      }
    );
  };

  // Lấy danh sách ảnh từ Firebase Storage
  const fetchImages = () => {
    const listRef = ref(storage, "images/");
    listAll(listRef)
      .then((res) => {
        const fetchPromises = res.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        return Promise.all(fetchPromises);
      })
      .then((urls) => setImages(urls))
      .catch((error) => console.error("Failed to fetch images:", error));
  };

  // Lấy danh sách ảnh khi component được render
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Uploaded Images:</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {images.map((url, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <img
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
