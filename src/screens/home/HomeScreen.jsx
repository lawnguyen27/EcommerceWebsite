import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  const [mensProducts, setMensProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchMensProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5077/api/Product/sex?pageNumber=1&pageSize=5&sex=Male"
      );
      console.log(response.data)
      const products = response.data;
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
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchMensProducts();
    console.log(mensProducts)

  }, []);
  return (
    <HomeScreenWrapper>
      <Hero />
      {/* <Featured /> */}
      <NewArrival />
      {/* <SavingZone /> */}
      <Catalog catalogTitle={"Categories For Men"} sex="Male" />
      <Catalog catalogTitle={"Categories For Women"} sex="Female"/>
      <Catalog catalogTitle={"Categories For Kid"} sex="Kid" />

      {/* <Brands /> */}
      <Catalog catalogTitle={"Unisex"} sex="Unisex" />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
