import React from "react";
import SingleProduct from "./SingleProduct";
import "../css/PopularProducts.scss";

const PopularProducts = () => {
  const cards = [
    <SingleProduct />,
    <SingleProduct />,
    <SingleProduct />,
    <SingleProduct />,
  ];

  return (
    <section
      id="popular"
      className="section-popular"
      style={{ display: "none" }}
    >
      <section className="container">
        <section className="title-section">
          <h2>Popular</h2>
          <p>Our top selling product that you may like</p>
        </section>
        <section className="cards">{cards}</section>
      </section>
    </section>
  );
};

export default PopularProducts;
