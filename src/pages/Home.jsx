import React from "react";
import Banner from "../components/Banner";
import Features from "../components/Feature";
import Gallery from "../components/Gallery";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
