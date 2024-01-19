import React from 'react';
import trunk from '../img/icones/truck.png'
import spiced from '../img/fotos/spiced-mint.png'
import spiced_mobile from '../img/fotos/spiced-mint-mobile.png'
import '../css/Product-Details.scss'

const ProductDetails = () => {
    return (
        <>
            <main class="container">
                <section class="page-product">
                    <article class="free-shopping">
                        <p>
                            All hand-made with natural soy wax, Candleaf is made for your
                            pleasure moments.
                            <span>
                                <img src={trunk} alt="emoji de truck" />
                                free shipping
                            </span>
                        </p>
                    </article>
                    <section>
                        <h2>Spiced Mint Candleaf®</h2>
                        <figure>
                            <picture>
                                <source
                                    media="(max-width:780px)"
                                    srcset={spiced_mobile}
                                />
                                <img
                                    src={spiced}
                                    alt="product spiced mint"
                                />
                            </picture>
                        </figure>
                        <form id="form-quantity-product" action="#" method="post">
                            <section class="cart">
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
                                                min="1"
                                                value="1"
                                            />
                                            <button type="button" class="btn-more">+</button>
                                        </div>
                                    </article>
                                </div>
                                <article class="checkboxes">
                                    <article>
                                        <input type="radio" name="subscribe" id="checkbox1" checked />
                                        <label for="checkbox1">One time purchase</label>
                                    </article>
                                    <section>
                                        <article class="check-subscribe">
                                            <article>
                                                <input type="radio" name="subscribe" id="subscribe" />
                                                <label for="subscribe">Subscribe and delivery every</label>
                                                <select name="weeks">
                                                    <option value="4">4 weeks</option>
                                                    <option value="8">8 weeks</option>
                                                    <option value="16">16 weeks</option>
                                                </select>
                                            </article>
                                            <p>
                                                Subscribe now and get the 10% of discount on every
                                                recurring order. The discount will be applied at checkout.
                                                <a href="#">See details</a>
                                            </p>
                                        </article>
                                        <p>
                                            <a class="button" href="./cart.html">
                                                <i class="bi bi-cart"></i> + Add to cart
                                            </a>
                                        </p>
                                    </section>
                                </article>
                            </section>
                        </form>

                        <article class="product-description">
                            <p>
                                <span>Fragrance:</span> Premium quality ingredients with natural
                                essential oils
                            </p>
                            <p>
                                <span>Wax:</span> Top grade Soy wax that delivers a smoke less,
                                consistent burn
                            </p>
                            <div class="info">
                                <p><span>Burning Time:</span> 70-75 hours</p>
                                <p><span>Dimension:</span> 10cm x 5cm</p>
                                <p><span>Weight:</span> 400g</p>
                            </div>
                        </article>
                    </section>
                </section>
            </main>
        </>
    );
}

export default ProductDetails;
