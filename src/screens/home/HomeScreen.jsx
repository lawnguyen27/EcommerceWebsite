import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  console.log(token,email)
  return (
    <HomeScreenWrapper>
      <Hero />
      {/* <Featured /> */}
      <NewArrival />
      {/* <SavingZone /> */}
      <Catalog catalogTitle={"Categories For Men"} products={mensCatalog} />
      <Catalog catalogTitle={"Categories For Women"} products={womensCatalog} />
      <Catalog catalogTitle={"Categories For Kid"} products={womensCatalog} />

      {/* <Brands /> */}
      <Catalog catalogTitle={"Unisex"} products={limelightCatalog} />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
