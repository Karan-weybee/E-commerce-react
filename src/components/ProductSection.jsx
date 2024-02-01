import React, { useState, useEffect } from 'react';
import { auth, fs } from '../Config/Config'
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SingleProduct from './SingleProduct';
import { collection, getDocs } from "firebase/firestore";
import { setDataLimit } from '../slices/productSlice';
import '../css/Products.scss'
import '../css/priceRange.scss'

const Products = () => {
    const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [cards, setCards] = useState([]);

  async function getProducts() {
    const querySnapshot = await getDocs(collection(fs, "products"));

    
      var datalimit=0;
      var card = []
      var count =1;
      querySnapshot.forEach((doc) => {
        datalimit++;
        if(count < 5){
          card.push(<SingleProduct id={doc.id} data={doc.data()} />)
          count++;
        }
      })
      dispatch(setDataLimit(datalimit))
      console.log(card)
      setCards(card)    
     
  }

  useEffect(() => {
    getProducts();
  }, [])

 
 const goToAllProduct = ()=>{
    nevigate('/allproducts')
 }
  return (
    <>
      <section id="products" class="container section-products">
        <section class="title-section">
          <h2 class="title">Products</h2>
          <p>Order it for you or for your beloved ones</p>

        </section>


        <div className="cards-filter">


          <section class="cards">

            {cards.length > 0 && (
              <>{cards}</>
            )}

          </section>
        </div>
        <div id="see-more-product" class=" btn-see-more">
        <button onClick={goToAllProduct} class="button"> See more
            </button> 
        </div>
      </section>
    </>
  );
}

export default Products;
