import React, {useState } from 'react';
import { fs } from '../Config/Config';
import { useSelector,useDispatch } from 'react-redux';

const OrderItem = ({ id, data}) => {
    const dispatch=useDispatch();
    var user = useSelector((state) => state.userSlice.user);
    console.log(user)

    console.log(id)
    console.log(data)
    const [product, setProduct] = useState(data);
    console.log(product)

    return (
        
        <section key={id}>
            {product && (

                <section class="product" id={id}>
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
                            {/* <p><button className='removeProduct' onClick={removeProduct}><a class="link" href="#">Remove</a></button></p> */}
                        </article>
                    </article>

                    <div>
                        <p class="price">$ {(product.price - (product.price * product.discount / 100))}</p>
                        <article class="quantity">
                            <label for="quantity" style={{ marginBottom: '-3px' }}>Quantity</label>
                            <div>
                                {/* <button type="button" class={`btn-less-${id}`} onClick={removeQty}>-</button> */}
                                <input
                                    id={`qty${id}`}
                                    min={1}
                                    type="number"
                                    name="quantity"
                                    value={product.qty}
                                    style={{
                                        border: '1px',
                                        margin: '0'
                                    }}
                                />

                                {/* <button type="button" class={`btn-more-${id}`} onClick={addQty}>+</button> */}
                            </div>
                        </article>
                        <p class="price total">$ {product.total}</p>
                    </div>
                </section>
            )}

         
        </section>
        

    );
}

export default OrderItem;
