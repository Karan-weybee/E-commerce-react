import React from 'react';
import '../css/SingleProduct.scss'

const SingleProduct = () => {
    return (
        <article class="card">
        <a href="./product.html">
            <figure>
                <picture>
                    <source
                        media="(max-width:768px)"
                        srcset="https://placehold.co/317x147" />
                    <img
                        src="https://placehold.co/255x177"
                        alt="product clean-lavander"
                    />
                </picture>
            </figure>
            <article>
                <h2>Clean Lavander</h2>
                <p>9.99$</p>
            </article>
        </a>
    </article>
    );
}

export default SingleProduct;
