import styled from "styled-components";
//import { products } from "../../data/data";
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
  const [products, setProducts] = useState([]);
  
    const fetchProducts = async () => {
    try {
     
      const response = await axios.get(
        `http://localhost:5077/api/Product/CategoryType?pageNumber=1&pageSize=5&categoryType=${sex.sex}` 
      );
      setProducts(response.data); // Gán danh sách sản phẩm vào state
      console.log(products)

    } catch (error) {
      console.error("Error fetching men's products:", error);
    } 
  };
  useEffect(() => {
    fetchProducts();
    console.log(products)

  },[sex]);
  return (
    <ProductListWrapper className="grid">
      {products?.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </ProductListWrapper>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array,
};
