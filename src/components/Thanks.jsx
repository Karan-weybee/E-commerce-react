import React from "react";
import logo from "../img/logos/logo.png";
import check_circle from "../img/icones/CheckCircle.png";
import cart_mobile from "../img/fotos/spiced-mint-cart-mobile.png";
import cart from "../img/fotos/spiced-mint-cart.png";
import "../css/Thanks.scss";
import { Link } from "react-router-dom";

const Thanks = () => {
  return (
    <>
      <section className="container">
        <section className="logo-candleat">
          <h1>
            <a href="./">
              <figure>
                <img src={logo} alt="logo candleaf" />
              </figure>
            </a>
          </h1>
        </section>
        <section className="page-thanks">
          <section>
            <section className="breadcrumb">
              <ul>
                <li>
                  <Link to="/cart" className="green">
                    Cart
                  </Link>
                  <i className="bi bi-chevron-right"></i>
                </li>
                <li>
                  <a href="#" className="green">
                    Details
                  </a>
                  <i className="bi bi-chevron-right"></i>
                </li>
                <li>
                  <a href="#" className="green">
                    Shipping
                  </a>
                  <i className="bi bi-chevron-right"></i>
                </li>
                <li>
                  <a className="black" href="#">
                    Payment
                  </a>
                </li>
              </ul>
            </section>
            <section className="section-thanks">
              <figure>
                <img src={check_circle} alt="icon check circle" />
              </figure>
              <h3>Payment Confirmed</h3>
              <br />
              <br />
              <p>ORDER COMPLETED</p>
              <div>
                <p>
                  Thank you Joe for buying Candleaf. The nature is grateful to
                  you. Now that your order is confirmed it will be ready to ship
                  in 2 days. Please check your inbox in the future for your
                  order updates.
                </p>
              </div>
              <p>
                <Link to="/" className="button">
                  Back to shopping
                </Link>
              </p>
              <p>
                <a className="link" href="#">
                  Print receipt
                </a>
              </p>
            </section>
          </section>
          <section className="summary-product hide">
            <article className="product">
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
            </article>
            <div className="value-product">
              <div>
                <p>
                  Subtotal<span className="price">$ 9.99</span>
                </p>
                <p>
                  Shipping<span>Free Shipping</span>
                </p>
              </div>
              <p>
                Paid<span className="price-total">$ 9.99</span>
              </p>
            </div>

            <article className="summary-product-button">
              <div>
                <div>
                  <i className="bi bi-cart"></i>
                  <span>1</span>
                </div>
                <p>
                  ORDER PAID<i className="bi bi-chevron-up"></i>
                </p>
              </div>
              <p className="price">$ 9.99</p>
            </article>
          </section>
        </section>
      </section>
    </>
  );
};

export default Thanks;
