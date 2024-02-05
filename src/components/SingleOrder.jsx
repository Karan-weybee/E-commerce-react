import React, { useEffect, useState } from "react";
import logo from "../img/logos/logo.png";
import { useSelector } from "react-redux";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import { fs } from "../Config/Config";
import "../css/Cart.scss";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "./OrderItem";
import { getOrder } from "../firebase/api/order";
import TableSkeleton from "./TableSkeleton";

const SingleOrder = () => {
  const nevigate = useNavigate();
  var user = useSelector((state) => state.userSlice.user);
  const { id } = useParams();
  const [cartProducts, setCartProducts] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [removeProduct, setRemoveProduct] = useState(0);

  console.log("grandtotal :- ", grandTotal);
  async function getOrderProducts() {
    await getOrder(id).then((doc) => {
      if (doc.exists()) {
        console.log(doc.data());
        var card = [];
        setGrandTotal(0);
        doc.data().products.forEach((product) => {
          console.log(product.productId, " => ", product);
          setGrandTotal((grandTotal) => grandTotal + product.total);
          card.push(<OrderItem id={product.productId} data={product} />);
        });
        setCartProducts(card);
      }
    });
  }

  useEffect(() => {
    if (!user) {
      nevigate("/");
    } else {
      getOrderProducts();
    }
  }, [removeProduct]);

  return (
    <>
      <section className="container">
        <section className="page-cart">
          <section className="title">
            <h2>Your order items</h2>
            <p>
              <Link className="link" to="/orders">
                Back to order list
              </Link>
            </p>
          </section>
          <div>
            <p>Product</p>
            <div>
              <p>Price</p>
              <p className="quantity-title">Quantity</p>
              <p className="total">Total</p>
            </div>
          </div>

          {cartProducts.length == 0 && (
            <>
              <div style={{ marginTop: "2.5em" }}>
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </div>
            </>
          )}
          {cartProducts.length > 0 && <> {cartProducts}</>}

          <section className="check-out">
            <article>
              <h3>
                Sub-total
                <span>$ {grandTotal}</span>
              </h3>
              <p>Tax and shipping cost will be calculated later</p>
            </article>
            {/* <p>
                            <Link className="button" to="/authentication">Check-out</Link>
                        </p> */}
          </section>
        </section>
      </section>
    </>
  );
};

export default SingleOrder;
