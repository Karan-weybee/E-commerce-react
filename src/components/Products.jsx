import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config'
import SingleProduct from './SingleProduct';
import { collection, getDocs } from "firebase/firestore";
import '../css/Products.scss'


const Products = () => {

  const [cards, setCards] = useState([]);
  console.log(cards);

  async function getProducts() {
    const querySnapshot = await getDocs(collection(fs, "products"));
    console.log("data");
    var card = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      card.push(<SingleProduct id={doc.id} data={doc.data()} />)
    })

    setCards(card)
  }

  useEffect(() => {
   getProducts();
  }, [])

  return (
    <section id="products" class="container section-products">
      <section class="title-section">
        <h2 class="title">Products</h2>
        <p>Order it for you or for your beloved ones</p>
      </section>
      <section class="cards">

        {cards.length > 0 && (
          <>{cards}</>
        )}

      </section>
      <div id="see-more-product" class="button btn-see-more">
        See more
      </div>
    </section>
  );
}

export default Products;
