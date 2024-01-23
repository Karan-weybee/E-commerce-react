import React, { useEffect, useState } from 'react';
import { doc,getDoc } from 'firebase/firestore';
import { fs } from '../Config/Config';
import logo from '../img/logos/logo.png'
import mobile1 from '../img/fotos/spiced-mint-cart-mobile.png'
import mobile2 from '../img/fotos/spiced-mint-cart.png'
import Header from './Header';

const CartItem = ({id,data}) => {
    console.log(id)
    console.log(data)
    const [product,setProduct]=useState('');

    async function getProduct() {

        const docRef = doc(fs, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(docSnap.data())
            console.log(product)
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {

        getProduct();

    }, [])

    let quantity = 1
    $(".btn-more").on("click", function () { // botao adicionar quantidade
        if ($("#quantity").val() <50) $("#quantity").val(++quantity)
        if ($("#quantity").val() >= 1) $(".btn-less").css('color', '#56b280')
    })
    $(".btn-less").on("click", function () { // botao remover quantidade
        if ($("#quantity").val() > 1) $("#quantity").val(--quantity)
        if ($("#quantity").val() == 1) $(".btn-less").css('color', '#A7A7A7')
    })

    return (
        <section key={id}>
            {product && (
              
            <section class="product">
                <article>
                    <figure>
                        <picture>
                            <source media="(max-width:780px)"
                                srcset={product.url}  
                                />
                            <img src={product.url}
                                alt="product spiced mint"
                                loading="lazy" 
                                className='cartItemImg'
                                />
                        </picture>
                    </figure>
                    <article>
                        <a href="./product.html">
                            <h2>{product.title}®</h2>
                        </a>
                        <p><a class="link" href="#">Remove</a></p>
                    </article>
                </article>

                <div>
                    <p class="price">$ {(product.price - (product.price * product.discount / 100))}</p>
                    <article class="quantity">
                        <label for="quantity" style={{ marginBottom: '-3px' }}>Quantity</label>
                        <div>
                            <button type="button" class="btn-less">-</button>
                            <input
                                id="quantity"
                                placeholder="1"
                                type="number"
                                name="quantity"
                                value={data.qty}
                                style={{
                                    border: '1px',
                                    margin: '0'
                                }}
                            />
                            <button type="button" class="btn-more">+</button>
                        </div>
                    </article>
                    <p class="price total">$ {data.total}</p>
                </div>
            </section>
              )}
        </section>

    );
}

export default CartItem;
