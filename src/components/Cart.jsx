import React, { useEffect, useState } from 'react';
import logo from '../img/logos/logo.png'
import { useSelector } from 'react-redux';
import { getDocs,collection } from 'firebase/firestore';
import { fs } from '../Config/Config';
import '../css/Cart.scss'
import CartItem from './CartItem';

const Cart = () => {

    var user = useSelector((state) => state.userSlice.user);
    const [cartProducts,setCartProducts]= useState('')

    async function getCartProducts() {
        const querySnapshot = await getDocs(collection(fs, `cart${user}`));
        console.log("data");
        var card = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          card.push(<CartItem id={doc.id} data={doc.data()} />)
        })
        setCartProducts(card);
      }
    
      useEffect(() => {
       getCartProducts();
      }, [])

    return (
        <>
          
                <section class="container">
                    <section class="page-cart">
                        <section class="title">
                            <h2>Your cart items</h2>
                            <p><a class="link" href="./">Back to shopping</a></p>
                        </section>
                        <div>
                            <p>Product</p>
                            <div>
                                <p>Price</p>
                                <p class="quantity-title">Quantity</p>
                                <p class="total">Total</p>
                            </div>
                        </div>
                        
                        {cartProducts.length > 0 && (
                           <> {cartProducts}</>
                        )}

                        <section class="check-out">
                            <article>
                                <h3>Sub-total
                                    <span>$ 9.99</span>
                                </h3>
                                <p>Tax and shipping cost will be calculated later</p>
                            </article>
                            <p>
                                <a class="button" href="./authentication.html">Check-out</a>
                            </p>
                        </section>
                    </section>
                </section>
            
        </>
    );
}

export default Cart;
