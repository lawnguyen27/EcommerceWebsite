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
