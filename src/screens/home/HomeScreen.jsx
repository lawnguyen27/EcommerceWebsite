import styled from "styled-components";
import Hero from "../../components/home/Hero";
//import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
//import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
//import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
//import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
 // const token = localStorage.getItem("token");
 //const email = localStorage.getItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return (
    <HomeScreenWrapper>
      <Hero />
      {/* <Featured /> */}
      <NewArrival />
      {/* <SavingZone /> */}
      <Catalog catalogTitle={"Sản phẩm cho nam"} sex="Male" />
      <Catalog catalogTitle={"Sản phẩm cho nữ"} sex="Female"/>
      <Catalog catalogTitle={"Sản phẩm cho trẻ em"} sex="Kid" />

      {/* <Brands /> */}
      <Catalog catalogTitle={"Sản phẩm cho cả nam và nữ"} sex="Unisex" />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
