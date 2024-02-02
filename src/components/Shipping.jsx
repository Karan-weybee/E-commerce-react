import React, { useState, useEffect } from 'react';
import cart_mobile from '../img/fotos/spiced-mint-cart-mobile.png'
import cart from '../img/fotos/spiced-mint-cart.png'
import logo from '../img/logos/logo.png'
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc,deleteDoc,setDoc,updateDoc,addDoc,collection} from 'firebase/firestore';
import { fs } from '../Config/Config';
import {setCartItems} from '../slices/productSlice'
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import '../css/Shipping.scss'

const Shipping = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const user = useSelector((state) => state.userSlice.user);
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [products, setProducts] = useState('')
    const [orderProducts,setOrderProducts]=useState('')
    const [grandTotal, setGrandTotal] = useState(0)
    async function getCartProducts() {
        await getDoc(doc(fs, `carts`, `${user}`)).then((document) => {
            if (document.exists()) {
                var card = []
                console.log("total")
                setGrandTotal((grandTotal) => (0))
                setProducts(document.data().products)
                document.data().products.map(async (product) => {
                    setGrandTotal((grandTotal) => (grandTotal + product.total))
                })

            }
        })
        await getDoc(doc(fs, `shipping`, `${user}`)).then((document) => {
            if (document.exists()) {
                setContact(document.data().contact)
                setAddress(document.data().address)
            }
        })

    }

    useEffect(() => {
        if (!user) {
            nevigate('/')
        }
        else {
            getCartProducts();
        }
    }, [])


    async function handleSubmit (){
      console.log("success")
      var card = []
      await getDoc(doc(fs, `carts`, `${user}`)).then(async (document) => {
        if (document.exists()) {
            
            console.log("total")
            setGrandTotal((grandTotal) => (0))

           await Promise.all(document.data().products.map(async (product) => {
                // console.log(product.productId, " => ", product);

                await getDoc(doc(fs, `products`, `${product.productId}`)).then((docs) => {
                    if (docs.exists()) {
                        card.push({ ...product, 'url': docs.data().url, 'title': docs.data().title, 'price': docs.data().price, 'discount': docs.data().discount })
                    }
                })
                setGrandTotal((grandTotal) => (grandTotal + product.total))

            }))

            // setOrderProducts(card);
            console.log(card)
            addOrder(card)
            console.log(card)
        }
    })
      

  
    }

    async function addOrder(card){
        const order= await addDoc(collection(fs, "orders"), {
            date : String(new Date()),
            products : card
         })
         console.log(order.id)
     
         await getDoc(doc(fs, `user-orders`, `${user}`)).then((document) => {
             if (document.exists()) {
                 var orders = [...document.data().orders,order.id]
                 updateOrderList(orders);
             }
             else{
                 addOrderList([order.id]);
             }
     
         });

         
        await deleteDoc(doc(fs, "carts", `${user}`)); 
        dispatch(setCartItems(0))
    }

    async function updateOrderList(orders){
        await updateDoc(doc(fs, `user-orders`, `${user}`), {
            orders:orders
        });
    }

    async function addOrderList(orders){
        const docRef = await setDoc(doc(fs, `user-orders`, `${user}`), {
            orders:orders
        });
      console.log(docRef)
    }
    return (
        <>
            <section class="container">
                <section class="page-shipping">
                    <section class="logo-candleat">
                        <h1><Link to="/">
                            <figure>
                                <img src={logo}
                                    alt="logo candleaf" />
                            </figure>
                        </Link></h1>
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

                            <form>
                                <article class="contact">

                                    <div className="bg">
                                        <div className="contact">
                                            <label htmlFor="" className='contect'>Contact</label>
                                            <label htmlFor="" className='email'>{contact && contact}</label>
                                            <button className='edit'>Edit</button>
                                        </div>
                                        <div id="line"></div>
                                        <div className="shipTo">
                                            <label htmlFor="" className='contect'>Ship to</label>
                                            <label htmlFor="" className='email'>{address && address}</label>
                                            <button className='edit'>Edit</button>
                                        </div>
                                    </div>
                                </article>
                                <article class="shipping">
                                    <h3 class="title">Shipping Method</h3>
                                    <div id="shipMethod">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="6.5" fill="#87D6AC" stroke="#DBDBDB" stroke-width="3" />
                                        </svg>
                                        <label htmlFor="" className='email'>Standard Shipping</label>
                                        <button className='edit'>Free</button>
                                    </div>
                                </article>
                                <article class="go_to_shipping">
                                    <p><Link to="/authentication">Back to Details</Link></p>
                                    <p style={{ position: 'absolute', right: '15%', bottom: '5%', backgroundColor: 'f2f2f2' }}>
                                        <form >
                                            <PaymentElement />
                                            <button class="button" type="button" onClick={handleSubmit} disabled={!stripe || !elements}>
                                                Pay
                                            </button>
                                            {/* Show error message to your customers */}
                                            {errorMessage && <div>{errorMessage}</div>}
                                        </form>
                                    </p>
                                </article>
                            </form>
                        </section>
                        <section class="summary-product hide">
                            <article class="product" style={{ visibility: 'hidden' }}>
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
                                <input type="button" class="button" id="add_code" value="Add code" />
                            </article>

                            <div class="value-product">
                                <div>
                                    <p>Subtotal
                                        <span class="price">$ {grandTotal && grandTotal}</span>
                                    </p>
                                    <p>Shipping
                                        <span>Free Shipping</span>
                                    </p>
                                </div>
                                <p>Total
                                    <span class="price-total">$ {grandTotal && grandTotal}</span>
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
                                <p class="price">$ {grandTotal && grandTotal}</p>
                            </article>
                        </section>
                    </section>
                </section>
            </section>
        </>
    );
}

export default Shipping;
