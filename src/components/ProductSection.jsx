import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SingleProduct from "./SingleProduct";
import { setDataLimit } from "../slices/productSlice";
import { getAllProducts } from "../firebase/api/product";
import "../css/Products.scss";
import "../css/priceRange.scss";

const Products = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [cards, setCards] = useState([]);

  async function getProducts() {
    const querySnapshot = await getAllProducts();

    var datalimit = 0;
    var card = [];
    var count = 1;
    querySnapshot.forEach((doc) => {
      datalimit++;
      if (count < 5) {
        card.push(<SingleProduct id={doc.id} data={doc.data()} />);
        count++;
      }
    });
    dispatch(setDataLimit(datalimit));
    console.log(card);
    setCards(card);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const goToAllProduct = () => {
    nevigate("/allproducts");
  };

  return (
    <>
      <section id="products" className="container section-products">
        <section className="title-section">
          <h2 className="title">Products</h2>
          <p>Order it for you or for your beloved ones</p>
        </section>

        {cards.length == 0 && (
          <h1>
            <span
              style={{ fontSize: "22px", margin: "auto", color: "#56B180" }}
            >
              {" "}
              Loading ...
            </span>
          </h1>
        )}
        {cards.length > 0 && (
          <div className="cards-filter">
            <section className="cards">
              {cards.length > 0 && <>{cards}</>}
            </section>
          </div>
        )}

        <div id="see-more-product" className=" btn-see-more">
          <button onClick={goToAllProduct} className="button">
            {" "}
            See more
          </button>
        </div>
      </section>
    </>
  );
};

export default Products;
