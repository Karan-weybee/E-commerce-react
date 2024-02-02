import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, arrayUnion, updateDoc, increment } from "firebase/firestore";
import { fs } from '../Config/Config'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCartItem } from '../slices/productSlice';
import { useParams } from 'react-router-dom';
import trunk from '../img/icones/truck.png'
import '../css/Product-Details.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = () => {

    const dispatch = useDispatch();
    var user = useSelector((state) => state.userSlice.user)
    const [errorMsg, setErrorMsg] = useState("")
    const { id } = useParams();
    const [product, setProduct] = useState('')

    async function getProduct() {

        const docRef = doc(fs, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(docSnap.data())
        } else {
            console.log("No such document!");
        }
    }

    async function addProductIntoCart() {

        await getDoc(doc(fs, `carts`, `${user}`)).then((doc) => {
            if (doc.exists()) {

                let items = doc.data().products;

                const index = items.findIndex(item => item.productId == `${id}`);
                if (index !== -1) {
                    console.log("update")
                    items[index] = {
                        productId: `${id}`,
                        qty: Number($("#quantity").val())+items[index].qty,
                        total: Number(Number($("#quantity").val()) * (product.price - (product.price * product.discount / 100))) +items[index].total     
                    }

                    updateItemInDoc(items);
                }

                else{
                    updateDocument();
                }
                   
            } else {
                createDocument()
            }
        })

       
        console.log("new cart added")
    }

    async function updateItemInDoc(items){
        await updateDoc(doc(fs, `carts`, `${user}`), {
            products:items
        });
    }

    async function updateDocument() {
        console.log("update")

        await updateDoc(doc(fs, `carts`, `${user}`), {
            products:arrayUnion({
                productId: `${id}`,
                qty: Number($("#quantity").val()),
                total: Number(Number($("#quantity").val()) * (product.price - (product.price * product.discount / 100)))
            })
        });


    }

    async function createDocument() {
        await setDoc(doc(fs, `carts`, `${user}`), {
            products: [{
                productId: `${id}`,
                qty: Number($("#quantity").val()),
                total: Number(Number($("#quantity").val()) * (product.price - (product.price * product.discount / 100)))
            }]
        });
    }


    useEffect(() => {
        getProduct();

    }, [])

    let quantity = 1
    $(".btn-more").on("click", function () { // botao adicionar quantidade
        if ($("#quantity").val() < product.quantity) $("#quantity").val(++quantity)
        if ($("#quantity").val() >= 1) $(".btn-less").css('color', '#56b280')
    })
    $(".btn-less").on("click", function () { // botao remover quantidade
        if ($("#quantity").val() > 1) $("#quantity").val(--quantity)
        if ($("#quantity").val() == 1) $(".btn-less").css('color', '#A7A7A7')
    })

    const addToCart = (e) => {
        e.preventDefault();
        console.log(user)
        if (user) {
            setErrorMsg("");
            addProductIntoCart();
            toast("Product added into cart")
            dispatch(incrementCartItem())
        }
        else {
            setErrorMsg("Login or signup to complete shopping");
        }
    }
    return (
        <>
            <main className="container">
                <section className="page-product">
                    <article className="free-shopping">
                        {product && (<p>
                            {product.discription}
                            <span>
                                <img src={trunk} alt="emoji de truck" />
                                free shipping
                            </span>
                        </p>)}
                    </article>
                    <section>
                        {product && (<h2>{product.title}® </h2>)}
                        <figure>
                            <picture>
                                <source
                                    media="(max-width:780px)"
                                    srcset={product.url}
                                    style={{
                                        width: '528px',
                                        height: '396px'
                                    }}

                                />
                                <img
                                    src={product.url}
                                    alt="product spiced mint"
                                    style={{
                                        width: '338.311px',
                                        height: '253.733px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </picture>
                        </figure>
                        <form id="form-quantity-product" action="#" method="post">
                            <section className="cart">
                                <div>
                                    <p className="price">$ {product && (<>{(product.price - (product.price * product.discount / 100))} </>)}</p>
                                    <article className="quantity">
                                        <label for="quantity" style={{ margin: 0 }}>Quantity</label>
                                        <div>
                                            <button type="button" className="btn-less">-</button>
                                            <input
                                                id="quantity"
                                                placeholder="1"
                                                type="number"
                                                name="quantity"
                                                min="1"
                                                max={product.quantity}
                                                value="1"
                                                style={{
                                                    border: '1px',
                                                    margin: 0
                                                }}
                                                readOnly
                                            />
                                            <button type="button" className="btn-more">+</button>
                                        </div>
                                    </article>
                                </div>
                                <article className="checkboxes">
                                    <article>
                                        <input type="radio" name="subscribe" id="checkbox1" checked />
                                        <label for="checkbox1">One time purchase</label>
                                    </article>
                                    <section>
                                        <article className="check-subscribe">
                                            <article>
                                                <input type="radio" name="subscribe" id="subscribe" />
                                                <label for="subscribe">Subscribe and delivery every</label>
                                                <select name="weeks">
                                                    <option value="4">4 weeks</option>
                                                    <option value="8">8 weeks</option>
                                                    <option value="16">16 weeks</option>
                                                </select>
                                            </article>
                                            <p>
                                                Subscribe now and get the 10% of discount on every
                                                recurring order. The discount will be applied at checkout.
                                                <a href="#">See details</a>
                                            </p>
                                        </article>
                                        <div className="errorMsg">
                                            {errorMsg && (
                                                <>{
                                                document.getElementById("myModal").style.display = "block"
                                                }
                                                </>
                                            )}
                                        </div>
                                        <p>
                                            <button className="button" onClick={(e) => addToCart(e)}>
                                                <i className="bi bi-cart"></i> + Add to cart
                                            </button>
                                        </p>
                                    </section>
                                </article>
                            </section>
                        </form>

                        <article className="product-description">
                            <p>
                                <span>Fragrance:</span> Premium quality ingredients with natural
                                essential oils
                            </p>
                            <p>
                                <span>Wax:</span> Top grade Soy wax that delivers a smoke less,
                                consistent burn
                            </p>
                            <div className="info">
                                <p><span>Burning Time:</span> 70-75 hours</p>
                                <p><span>Dimension:</span> 10cm x 5cm</p>
                                <p><span>Weight:</span> 400g</p>
                            </div>
                        </article>
                    </section>
                </section>
            </main>

            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce />
        </>
    );
}

export default ProductDetails;
