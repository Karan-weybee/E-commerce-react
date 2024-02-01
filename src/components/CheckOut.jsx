import React, { useState, useEffect } from 'react';
import logo from '../img/logos/logo.png'
import cart_mobile from '../img/fotos/spiced-mint-cart-mobile.png'
import cart from '../img/fotos/spiced-mint-cart.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { fs } from '../Config/Config';
import '../css/Authentication.scss'

const Authentication = () => {
    const nevigate = useNavigate();
    const user = useSelector((state) => state.userSlice.user);
    const [cartProducts, setCartProducts] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)
    const [contact, setContact] = useState('')
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [state,setState]=useState('Gujrat')
    const [country, setCountry] = useState('india')
    const [discountValue,setDiscountValue]=useState(false)
    
    console.log(discountValue)
    async function getCartProducts() {
        await getDoc(doc(fs, `carts`, `${user}`)).then((document) => {
            if (document.exists()) {
                var card = []
                console.log("total")
                setGrandTotal((grandTotal) => (0))

                document.data().products.map(async (product) => {
                    // console.log(product.productId, " => ", product);

                    await getDoc(doc(fs, `products`, `${product.productId}`)).then((docs) => {
                        if (docs.exists()) {

                            card.push({ ...product, 'url': docs.data().url, 'title': docs.data().title, 'price': docs.data().price, 'discount': docs.data().discount })
                        }
                    })
                    setGrandTotal((grandTotal) => (grandTotal + product.total))

                })

                setCartProducts(card);
                console.log(cartProducts)
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

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(contact, firstName, secondName, address, city, postalCode,state, country)
        // Add a new document in collection "cities"
        await setDoc(doc(fs, "shipping", `${user}`), {
           contact:contact,
           firstName:firstName,
           secondName:secondName,
           address:address,
           city:city,
           postalCode:postalCode,
           state:state,
           country:country
        });

        nevigate('/shipping')
    }
    return (
        <>
            <section class="container">
                <section class="page-authentication">
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
                                        <Link
                                            to="/cart"
                                            class="green">Cart</Link>
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

                            <form onSubmit={(e) => handleSubmit(e)}
                                method='post'
                                id="form-authentication"
                                enctype="multipart/form">
                                <article class="contact">
                                    <div>
                                        <label class="title" for="contact-email-phone">Contact</label>
                                        <p>
                                            Do you have an account?
                                            <a style={{marginLeft:'0.5em'}} href="#">Login</a>
                                        </p>
                                    </div>
                                    <input placeholder="Email or mobile phone number" id="contact_email_phone"
                                        name="contact_email_phone" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
                                    <article class="checkbox">
                                        <input type="checkbox" name="newsletter" id="newsletter" value={discountValue} onChange={(e)=>{
                                            setDiscountValue(!discountValue)}}/>
                                        <label for="newsletter">
                                            Add me to Candleaf newsletter for a 10% discount</label>
                                    </article>
                                </article>
                                <article class="shipping">
                                    <h3 class="title">Shipping Address</h3>
                                    <div class="wrapper">
                                        <p>
                                            <input id="name" name="name" type="text" placeholder="Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                        </p>
                                        <p>
                                            <input id="second_name" name="second_name" type="text"
                                                placeholder="Second Name" value={secondName} onChange={(e) => setSecondName(e.target.value)} required />
                                        </p>
                                    </div>

                                    <p>
                                        <input id="addreess" name="address" type="text"
                                            placeholder="Address and Number" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </p>

                                    <div class="wrapper">
                                        <p>
                                            <input id="city" name="city" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                                        </p>
                                        <p>
                                            <input id="postal_code" name="postal_code" type="text"
                                                placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                                        </p>
                                        <div class="select">
                                            <span>Province</span>
                                            <select name="province" id="province" value={state} onSelect={(e) => setState(e.target.value)}>
                                                <option value="Gujrat">Gujrat</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="select">
                                        <span>Country/Region</span>
                                        <select name="country-region" id="country-region" value={country} onSelect={(e) => setCountry(e.target.value)} required>
                                            <option value="india">India</option>
                                        </select>
                                    </div>
                                    <div class="checkbox">
                                        <input type="checkbox" name="save_info" id="save_info" />
                                        <label for="save_info">Save this informations for a future fast checkout</label>
                                    </div>
                                </article>
                                <article class="go_to_shipping">
                                    <p><Link to="/cart">Back to cart</Link></p>
                                    <p><input class="button" type="submit" value="Go to shipping" /></p>
                                </article>
                            </form>
                        </section>
                        <section class="summary-product hide">
                            <div className="products-cart" style={{ height: '418px', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {cartProducts.length > 0 && (
                                    cartProducts.map((cartProduct) => (
                                        <article class="product" key={cartProduct.productId}>
                                            <figure>
                                                <picture>
                                                    <source media="(max-width:780px)"
                                                        srcset={cart_mobile} />
                                                    <img src={cartProduct.url} alt="product spiced-mint" style={{ height: '130px', background: 'white', borderRadius: '14px' }} />
                                                </picture>
                                                <span>{cartProduct.qty}</span>
                                            </figure>
                                            <div>
                                                <h3>{cartProduct.title}®</h3>
                                                <p>$ {cartProduct.price - (cartProduct.price * cartProduct.discount / 100)}</p>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                            <article class="add-code">
                                <input type="text" name="add_code" id="add_code" placeholder="Coupon code" />
                                <input type="button" class="button" id="add_code" value="Add code" />
                            </article>

                            <div class="value-product">
                                <div>
                                    <p>Subtotal
                                        <span class="price">${grandTotal && grandTotal}</span>
                                    </p>
                                    <p>Shipping
                                    {discountValue && <span>10% discount Added</span>}
                                    {!discountValue&&(<><span>Calculated at the next step</span></>)}
                                    </p>
                                </div>
                                <p>Total
                                    <span class="price-total">$
                                    {discountValue && (grandTotal-grandTotal*10/100)}
                                {!discountValue && grandTotal}
                                    </span>
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
                                <p class="price">$
                                {discountValue && (grandTotal-grandTotal*10/100)}
                                {!discountValue && grandTotal}
                                
                                </p>
                            </article>
                        </section>
                    </section>
                </section>
            </section>
        </>
    );
}

export default Authentication;
