import styled from "styled-components";
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

const ProductListByCategory = ({ cateId }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log(cateId)
      const response = await axios.get(
        `http://localhost:5077/api/Product/category?pageNumber=1&pageSize=5&cateid=${cateId}`
      );
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [cateId]);

  return (
    <ProductListWrapper className="grid">
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default ProductListByCategory;

ProductListByCategory.propTypes = {
  cateId: PropTypes.number.isRequired,
};
