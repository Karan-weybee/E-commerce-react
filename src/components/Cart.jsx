import React, { useEffect, useState } from 'react';
import logo from '../img/logos/logo.png'
import { useSelector } from 'react-redux';
import { getDocs, getDoc, doc, collection } from 'firebase/firestore';
import { fs } from '../Config/Config';
import '../css/Cart.scss'
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

    const nevigate = useNavigate();
    var user = useSelector((state) => state.userSlice.user);
    const [cartProducts, setCartProducts] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)
    const [removeProduct, setRemoveProduct] = useState(0)

    console.log("grandtotal :- ", grandTotal)
    async function getCartProducts() {
        await getDoc(doc(fs, `carts`, `${user}`)).then((doc) => {
            if (doc.exists()) {
                console.log(doc.data().products[0].productId)
                var card = []
                setGrandTotal(0)
                doc.data().products.forEach((product) => {
                    console.log(product.productId, " => ", product);
                    setGrandTotal((grandTotal => grandTotal + product.total))
                    card.push(<CartItem id={product.productId} data={product} setGrandTotal={setGrandTotal} setRemoveProduct={setRemoveProduct}/>)
                })
                setCartProducts(card);
            }
        })
        // const querySnapshot = await getDocs(collection(fs,`cart${user}`));
        // var card = []
        // setGrandTotal(0) 
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        //     setGrandTotal((grandTotal => grandTotal + doc.data().total))
        //     card.push(<CartItem id={doc.id} data={doc.data()} setGrandTotal={setGrandTotal} setRemoveProduct={setRemoveProduct} />)
        // })
        // setCartProducts(card);
    }

    useEffect(() => {
        if (!user) {
            nevigate('/')
        }
        else {
            getCartProducts();
        }
    }, [removeProduct])

    return (
        <>
            <section class="container">
                <section class="page-cart">
                    <section class="title">
                        <h2>Your cart items</h2>
                        <p><Link class="link" to="/">Back to shopping</Link></p>
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
                                <span>$ {grandTotal}</span>
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
