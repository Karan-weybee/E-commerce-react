import React from 'react';
import logo from '../img/logos/logo.png'
import mobile1 from '../img/fotos/spiced-mint-cart-mobile.png'
import mobile2 from '../img/fotos/spiced-mint-cart.png'
import Header from './Header';
import '../css/Cart.scss'

const Cart = () => {
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
                        <form
                            action="#"
                            method="post"
                            enctype="multipart/form">
                            <section>
                                <section class="product">
                                    <article>
                                        <figure>
                                            <picture>
                                                <source media="(max-width:780px)"
                                                    srcset={mobile1} />
                                                <img src={mobile2}
                                                    alt="product spiced mint"
                                                    loading="lazy" />
                                            </picture>
                                        </figure>
                                        <article>
                                            <a href="./product.html">
                                                <h2>Spiced Mint Candleaf®</h2>
                                            </a>
                                            <p><a class="link" href="#">Remove</a></p>
                                        </article>
                                    </article>

                                    <div>
                                        <p class="price">$ 9.99</p>
                                        <article class="quantity">
                                            <label for="quantity">Quantity</label>
                                            <div>
                                                <button type="button" class="btn-less">-</button>
                                                <input
                                                    id="quantity"
                                                    placeholder="1"
                                                    type="number"
                                                    name="quantity"
                                                    value="1"
                                                />
                                                <button type="button" class="btn-more">+</button>
                                            </div>
                                        </article>
                                        <p class="price total">$ 9.99</p>
                                    </div>
                                </section>
                            </section>
                        </form>

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
