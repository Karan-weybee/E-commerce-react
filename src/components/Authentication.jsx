import React from 'react';
import logo from '../img/logos/logo.png'
import cart_mobile from '../img/fotos/spiced-mint-cart-mobile.png'
import cart from '../img/fotos/spiced-mint-cart.png'
import '../css/Authentication.scss'

const Authentication = () => {
    return (
        <>
        <section class="container">
        <section class="page-authentication">
            <section class="logo-candleat">
                <h1><a href="./">
                    <figure>
                        <img src={logo}
                            alt="logo candleaf" />
                    </figure>
                    </a></h1>
            </section>
            <section class="account-details">
                <section class="section-left">
                    <section class="breadcrumb">
                        <ul>
                            <li>
                                <a 
                                    href="./cart.html" 
                                    class="green">Cart</a>
                                <i class="bi bi-chevron-right"></i>
                            </li>
                            <li>
                                <a href="#" class="black">Details</a>
                                <i class="bi bi-chevron-right"></i>
                            </li>
                            <li>
                                <a href="#">Shipping</a>
                                <i class="bi bi-chevron-right"></i>
                            </li>
                            <li><a href="#">Payment</a></li>
                        </ul>
                    </section>

                    <form
                        action="thanks.html"
                        method="post"
                        id="form-authentication"
                        enctype="multipart/form">
                        <article class="contact">
                            <div>
                                <label class="title" for="contact-email-phone">Contact</label>
                                <p>
                                    Do you have an account?
                                    <a href="#">Login</a>
                                </p>
                            </div>
                            <input placeholder="Email or mobile phone number" id="contact_email_phone"
                                name="contact_email_phone" type="text" />
                            <article class="checkbox">
                                <input type="checkbox" name="newsletter" id="newsletter" />
                                <label for="newsletter">
                                    Add me to Candleaf newsletter for a 10% discount</label>
                            </article>
                        </article>
                        <article class="shipping">
                            <h3 class="title">Shipping Address</h3>
                            <div class="wrapper">
                                <p>
                                    <input id="name" name="name" type="text" placeholder="Name" />
                                </p>
                                <p>
                                    <input id="second_name" name="second_name" type="text"
                                        placeholder="Second Name" />
                                </p>
                            </div>

                            <p>
                                <input id="addreess" name="address" type="text"
                                    placeholder="Address and Number" />
                            </p>

                            <div class="wrapper">
                                <p>
                                    <input id="city" name="city" type="text" placeholder="City" />
                                </p>
                                <p>
                                    <input id="postal_code" name="postal_code" type="text"
                                        placeholder="Postal Code" />
                                </p>
                                <div class="select">
                                    <span>Province</span>
                                    <select name="province" id="province">
                                        <option value="">Province</option>
                                    </select>
                                </div>
                            </div>
                            <div class="select">
                                <span>Country/Region</span>
                                <select name="country-region" id="country-region">
                                    <option value="italy">Italy</option>
                                </select>
                            </div>
                            <div class="checkbox">
                                <input type="checkbox" name="save_info" id="save_info" />
                                <label for="save_info">Save this informations for a future fast checkout</label>
                            </div>
                        </article>
                        <article class="go_to_shipping">
                            <p><a href="./cart.html">Back to cart</a></p>
                            <p><input class="button" type="submit" value="Go to shipping" /></p>
                        </article>
                    </form>
                </section>
                <section class="summary-product hide">
                    <article class="product">
                        <figure>
                            <picture>
                                <source media="(max-width:780px)"
                                    srcset={cart_mobile} />
                                <img src={cart} alt="product spiced-mint" />
                            </picture>
                            <span>1</span>
                        </figure>
                        <div>
                            <h3>Spiced Mint Candleaf®</h3>
                            <p>$ 9.99</p>
                        </div>
                    </article>

                    <article class="add-code">
                        <input type="text" name="add_code" id="add_code" placeholder="Coupon code" />
                        <input type="button" class="button" id="add_code"value="Add code" />
                    </article>

                    <div class="value-product">
                        <div>
                            <p>Subtotal
                                <span class="price">$ 9.99</span>
                            </p>
                            <p>Shipping
                                <span>Calculated at the next step</span>
                            </p>
                        </div>
                        <p>Total
                            <span class="price-total">$ 9.99</span>
                        </p>
                    </div>
                    <article class="summary-product-button">
                        <div><div>
                                <i class="bi bi-cart"></i>
                                <span>1</span>
                            </div>
                            <p>
                                See your order details
                                <i class="bi bi-chevron-up"></i>
                            </p>
                        </div>
                        <p class="price">$ 9.99</p>
                    </article>
                </section>
            </section>
        </section>
    </section>
    </>
    );
}

export default Authentication;
