import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";

const HomeScreenWrapper = styled.main``;

const HomeScreenAuth = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // Kiểm tra token và email
  useEffect(() => {
    if (!token || !email) {
      navigate("/"); // Chuyển hướng về trang chủ
    }
  }, [token, email, navigate]); // Thực hiện kiểm tra khi token hoặc email thay đổi

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

export default HomeScreenAuth;
