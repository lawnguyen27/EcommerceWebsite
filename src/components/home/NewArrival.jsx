import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { breakpoints } from "../../styles/themes/default";
import CustomNextArrow from "../common/CustomNextArrow";
import CustomPrevArrow from "../common/CustomPrevArrow";
import { commonCardStyles } from "../../styles/card";
import axios from "axios";

const ProductCardBoxWrapper = styled.div`
  ${commonCardStyles}
  .product-img {
    height: 262px;
    width: 262px;
  }
.product-info {
    text-align: center; /* Căn giữa chữ trong thẻ p */
    p {
      margin: 0; /* Loại bỏ khoảng cách mặc định nếu cần */
    }
  }
  @media (max-width: ${breakpoints.sm}) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const ArrivalSliderWrapper = styled.div`
  .custom-prev-arrow {
    top: 43%;
    left: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      left: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      left: 4px;
    }
  }

  .custom-next-arrow {
    top: 43%;
    right: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      right: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      right: 4px;
    }
  }
`;

const NewArrival = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
  };
  const [data, setData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5077/api/Category");
      const categories = response.data;

      const formattedData = categories.map((category, index) => ({
        id: `new-arrival-${index + 1}`,
        imgSource: category.imgUrl,
        title: category.name,
      }));

      setData(categories); // Cập nhật state
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCategoryClick = (category) => {
    navigate("/product", { state: { category } });
  };

  // Gọi fetchCategories khi component được mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  return (
    <Section>
      <Container>
        <Title titleText={"Danh mục sản phẩm"} />
        <ArrivalSliderWrapper>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            {...settings}
          >
            {data.map((category) => {
              return (
                <ProductCardBoxWrapper
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="product-img">
                    <img
                      className="object-fit-cover"
                      src={category.imgUrl}
                      alt={category.name}
                    />
                  </div>
                  <div className="product-info">
                    <p className="font-semibold text-xl">{category.name}</p>
                  </div>
                </ProductCardBoxWrapper>
              );
            })}
          </Slider>
        </ArrivalSliderWrapper>
      </Container>
    </Section>
  );
};

export default NewArrival;
