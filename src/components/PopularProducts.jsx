import React from 'react';
import SingleProduct from './SingleProduct';
import '../css/PopularProducts.scss'

const PopularProducts = () => {
    const cards = [<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>]
    
    return (
       
        <section id="popular" class="section-popular">
          <section class="container">
            <section class="title-section">
              <h2>Popular</h2>
              <p>Our top selling product that you may like</p>
            </section>
            <section class="cards">
             
             {cards}
            </section>
          </section>
        </section>
    );
}

export default PopularProducts;
