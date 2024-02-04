import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const OrderItem = ({ id, data }) => {
  const dispatch = useDispatch();
  var user = useSelector((state) => state.userSlice.user);
  console.log(user);

  console.log(id);
  console.log(data);
  const [product, setProduct] = useState(data);
  console.log(product);

  return (
    <section key={id}>
      {product && (
        <section className="product" id={id}>
          <article>
            <figure>
              <picture>
                <source media="(max-width:780px)" srcset={product.url} />
                <img
                  src={product.url}
                  alt="product spiced mint"
                  loading="lazy"
                  className="cartItemImg"
                />
              </picture>
            </figure>
            <article>
              <a href="./product.html">
                <h2>{product.title}®</h2>
              </a>
              {/* <p><button className='removeProduct' onClick={removeProduct}><a className="link" href="#">Remove</a></button></p> */}
            </article>
          </article>

          <div>
            <p className="price">
              $ {product.price - (product.price * product.discount) / 100}
            </p>
            <article className="quantity">
              <label for="quantity" style={{ marginBottom: "-3px" }}>
                Quantity
              </label>
              <div>
                {/* <button type="button" className={`btn-less-${id}`} onClick={removeQty}>-</button> */}
                <input
                  id={`qty${id}`}
                  min={1}
                  type="number"
                  name="quantity"
                  value={product.qty}
                  style={{
                    border: "1px",
                    margin: "0",
                  }}
                />

                {/* <button type="button" className={`btn-more-${id}`} onClick={addQty}>+</button> */}
              </div>
            </article>
            <p className="price total">$ {product.total}</p>
          </div>
        </section>
      )}
    </section>
  );
};

export default OrderItem;
