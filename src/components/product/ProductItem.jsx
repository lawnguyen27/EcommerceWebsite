import React from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductCardWrapper = styled.div`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }


`;

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate("/product/details", { state: { product } });
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  return (
    <ProductCardWrapper key={product.id} onClick={handleProductClick}>
      <div className="product-img">
        <img className="object-fit-cover" src={product.productImages[0].imageUrl} alt={product.name} />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <p className="font-bold">{product.name}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">{product.description}</span>
          <span className="text-outerspace font-bold">{formatPrice(product.price)}</span>
        </div>
      </div>
    </ProductCardWrapper>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
