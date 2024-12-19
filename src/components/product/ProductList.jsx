import styled from "styled-components";
import { products } from "../../data/data";
import ProductItem from "./ProductItem";
import { PropTypes } from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import axios from "axios";
import React, { useState, useEffect } from "react";
const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ProductList = (sex) => {
  console.log(sex)
  const [mensProducts, setMensProducts] = useState([]);
    const fetchMensProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5077/api/Product/sex?pageNumber=1&pageSize=5&sex=${sex.sex}` 
      );
      const products = response.data;
      console.log(response.data)
      const formattedData = products.map((product) => ({
        id: product.id,
        imgSource: product.imageUrl,
        title: product.name,
        brand:product.description,
        price:product.sex,
      }));
      setMensProducts(formattedData); // Gán danh sách sản phẩm vào state

      console.log(mensProducts)

    } catch (error) {
      console.error("Error fetching men's products:", error);
    } 
  };
  useEffect(() => {
    fetchMensProducts();
    console.log(mensProducts)

  }, []);
  return (
    <ProductListWrapper className="grid">
      {mensProducts?.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </ProductListWrapper>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array,
};
