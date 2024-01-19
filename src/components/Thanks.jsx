import React from 'react';
import logo from '../img/logos/logo.png'
import check_circle from '../img/icones/CheckCircle.png'
import cart_mobile from '../img/fotos/spiced-mint-cart-mobile.png'
import cart from '../img/fotos/spiced-mint-cart.png'
import '../css/Thanks.scss'

const Thanks = () => {
    return (
        <>
         <section class="container">
                <section class="logo-candleat">
                    <h1><a href="./">
                        <figure>
                            <img src={logo}
                                alt="logo candleaf" />
                        </figure>
                        </a></h1>
                </section>
                <section class="page-thanks">
                    <section>
                        <section class="breadcrumb">
                            <ul>
                                <li>
                                    <a href="./cart.html" class="green">Cart</a>
                                    <i class="bi bi-chevron-right"></i>
                                </li>
                                <li>
                                    <a href="./authentication.html" class="green">Details</a>
                                    <i class="bi bi-chevron-right"></i>
                                </li>
                                <li>
                                    <a href="#" class="green">Shipping</a>
                                    <i class="bi bi-chevron-right"></i>
                                </li>
                                <li><a class="black" href="#">Payment</a></li>
                            </ul>
                        </section>
                        <section class="section-thanks">
                            <figure>
                                <img src={check_circle} alt="icon check circle" />
                            </figure>
                            <h3>Payment Confirmed</h3>
                            <p>ORDER #2039</p>
                            <div>
                                <p>
                                    Thank you Joe for buying Candleaf. The nature is
                                    grateful to you. Now that your order is confirmed 
                                    it will be ready to ship in 2 days. Please check 
                                    your inbox in the future for your order updates.
                                </p>
                            </div>
                            <p>
                                <a href="/" class="button">Back to shopping</a>
                            </p>
                            <p>
                                <a class="link" href="#">Print receipt</a>
                            </p>
                        </section>
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
                                <h3>Spiced Mint Candleaf®</h3><p>$ 9.99</p>
                            </div>
                        </article>
                        <div class="value-product">
                            <div>
                                <p>Subtotal<span class="price">$ 9.99</span></p>
                                <p>Shipping<span>Free Shipping</span></p>
                            </div>
                            <p>Paid<span class="price-total">$ 9.99</span>
                            </p>
                        </div>

                        <article class="summary-product-button">
                            <div>
                                <div>
                                    <i class="bi bi-cart"></i><span>1</span>
                                </div>
                                <p>ORDER PAID<i class="bi bi-chevron-up"></i></p>
                            </div>
                            <p class="price">$ 9.99</p>
                        </article>
                    </section>
                </section>
            </section>
            </>
    );
}

export default Thanks;
