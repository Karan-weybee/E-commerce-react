import React, { useState, useEffect } from "react";
import cart_mobile from "../img/fotos/spiced-mint-cart-mobile.png";
import cart from "../img/fotos/spiced-mint-cart.png";
import logo from "../img/logos/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { fs } from "../Config/Config";
import { setCartItems } from "../slices/productSlice";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../css/Shipping.scss";
import { getAllCarts } from "../firebase/api/cart";
import { getSingleProduct } from "../firebase/api/product";
import { getShipping } from "../firebase/api/shipping";
import {
  addNewOrder,
  userOrders,
  updateOrder,
  setOrderList,
} from "../firebase/api/order";
import { deleteCart } from "../firebase/api/cart";

const Shipping = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const user = useSelector((state) => state.userSlice.user);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState("");
  const [orderProducts, setOrderProducts] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  async function getCartProducts() {
    await getAllCarts(user).then((document) => {
      if (document.exists()) {
        var card = [];
        console.log("total");
        setGrandTotal((grandTotal) => 0);
        setProducts(document.data().products);
        document.data().products.map(async (product) => {
          setGrandTotal((grandTotal) => grandTotal + product.total);
        });
      }
    });
    await getShipping(user).then((document) => {
      if (document.exists()) {
        setContact(document.data().contact);
        setAddress(document.data().address);
      }
    });
  }

  useEffect(() => {
    if (!user) {
      nevigate("/");
    } else {
      getCartProducts();
    }
  }, []);

  async function handleSubmit() {
    console.log("success");
    var card = [];
    await getAllCarts(user).then(async (document) => {
      if (document.exists()) {
        console.log("total");
        setGrandTotal((grandTotal) => 0);

        await Promise.all(
          document.data().products.map(async (product) => {
            // console.log(product.productId, " => ", product);

            await getSingleProduct(`${product.productId}`).then((docs) => {
              if (docs.exists()) {
                card.push({
                  ...product,
                  url: docs.data().url,
                  title: docs.data().title,
                  price: docs.data().price,
                  discount: docs.data().discount,
                });
              }
            });
            setGrandTotal((grandTotal) => grandTotal + product.total);
          })
        );

        // setOrderProducts(card);
        console.log(card);
        addOrder(card);
        nevigate("/thanks");
      }
    });
  }

  async function addOrder(card) {
    const order = await addNewOrder(card);
    console.log(order.id);

    await userOrders(user).then((document) => {
      if (document.exists()) {
        var orders = [...document.data().orders, order.id];

        updateOrderList(orders);
      } else {
        addOrderList([order.id]);
      }
    });

    await deleteCart(user);
    dispatch(setCartItems(0));
  }

  async function updateOrderList(orders) {
    await updateOrder(user, orders);
  }

  async function addOrderList(orders) {
    const docRef = await setOrderList(user, orders);
    console.log(docRef);
  }
  return (
    <>
      <section className="container">
        <section className="page-shipping">
          <section className="logo-candleat">
            <h1>
              <Link to="/">
                <figure>
                  <img src={logo} alt="logo candleaf" />
                </figure>
              </Link>
            </h1>
          </section>
          <section className="account-details">
            <section className="section-left">
              <section className="breadcrumb">
                <ul>
                  <li>
                    <a href="./cart.html" className="green">
                      Cart
                    </a>
                    <i className="bi bi-chevron-right"></i>
                  </li>
                  <li>
                    <a href="#" className="black">
                      Details
                    </a>
                    <i className="bi bi-chevron-right"></i>
                  </li>
                  <li>
                    <a href="#">Shipping</a>
                    <i className="bi bi-chevron-right"></i>
                  </li>
                  <li>
                    <a href="#">Payment</a>
                  </li>
                </ul>
              </section>

              <form>
                <article className="contact">
                  <div className="bg">
                    <div className="contact">
                      <label htmlFor="" className="contect">
                        Contact
                      </label>
                      <label htmlFor="" className="email">
                        {contact && contact}
                      </label>
                      <button className="edit">Edit</button>
                    </div>
                    <div id="line"></div>
                    <div className="shipTo">
                      <label htmlFor="" className="contect">
                        Ship to
                      </label>
                      <label htmlFor="" className="email">
                        {address && address}
                      </label>
                      <button className="edit">Edit</button>
                    </div>
                  </div>
                </article>
                <article className="shipping">
                  <h3 className="title">Shipping Method</h3>
                  <div id="shipMethod">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6.5"
                        fill="#87D6AC"
                        stroke="#DBDBDB"
                        stroke-width="3"
                      />
                    </svg>
                    <label htmlFor="" className="email">
                      Standard Shipping
                    </label>
                    <button className="edit">Free</button>
                  </div>
                </article>
                <article className="go_to_shipping">
                  <p>
                    <Link to="/authentication">Back to Details</Link>
                  </p>
                  <p className="payment">
                    <h3 className="title" style={{ marginBottom: "1.5em" }}>
                      Payment From Card
                    </h3>
                    <form>
                      <PaymentElement />
                      <button
                        className="button"
                        type="button"
                        onClick={handleSubmit}
                        disabled={!stripe || !elements}
                      >
                        Pay
                      </button>
                      {/* Show error message to your customers */}
                      {errorMessage && <div>{errorMessage}</div>}
                    </form>
                  </p>
                </article>
              </form>
            </section>
            <section className="summary-product hide">
              {/* <article className="product" style={{ visibility: "hidden" }}>
                <figure>
                  <picture>
                    <source media="(max-width:780px)" srcset={cart_mobile} />
                    <img src={cart} alt="product spiced-mint" />
                  </picture>
                  <span>1</span>
                </figure>
                <div>
                  <h3>Spiced Mint Candleaf®</h3>
                  <p>$ 9.99</p>
                </div>
              </article> */}

              <article className="add-code">
                <input
                  type="text"
                  name="add_code"
                  id="add_code"
                  placeholder="Coupon code"
                />
                <input
                  type="button"
                  className="button"
                  id="add_code"
                  value="Add code"
                />
              </article>

              <div className="value-product">
                <div>
                  <p>
                    Subtotal
                    <span className="price">$ {grandTotal && grandTotal}</span>
                  </p>
                  <p>
                    Shipping
                    <span>Free Shipping</span>
                  </p>
                </div>
                <p>
                  Total
                  <span className="price-total">
                    $ {grandTotal && grandTotal}
                  </span>
                </p>
              </div>
              <article className="summary-product-button">
                <div>
                  <div>
                    <i className="bi bi-cart"></i>
                    <span>1</span>
                  </div>
                  <p>
                    See your order details
                    <i className="bi bi-chevron-up"></i>
                  </p>
                </div>
                <p className="price">$ {grandTotal && grandTotal}</p>
              </article>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Shipping;
