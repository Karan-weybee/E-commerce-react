import React, { useEffect, useState } from 'react';
import { setDoc, doc, getDoc, deleteDoc,updateDoc } from 'firebase/firestore';
import { fs } from '../Config/Config';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const CartItem = ({ id, data, setGrandTotal,setRemoveProduct }) => {
    var user = useSelector((state) => state.userSlice.user);
    console.log(user)

    console.log(id)
    console.log(data)
    const [product, setProduct] = useState('');
    const [qty, setQty] = useState(data.qty);
    const [total, setTotal] = useState(data.total)

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
        setQty(data.qty)
        setTotal(data.total)
    }, [data])


    const addQty = async () => {

        setQty((qty) => qty + 1)
        setTotal((qty + 1) * (product.price - (product.price * product.discount / 100)));
        setGrandTotal((grandTotal) => grandTotal + (product.price - (product.price * product.discount / 100)))

        chnageQty((qty+1),((qty + 1) * (product.price - (product.price * product.discount / 100))))
    }

    const removeQty = async () => {

        if (qty > 1) {
            setQty((qty) => qty - 1)
            setTotal((qty - 1) * (product.price - (product.price * product.discount / 100)));
            setGrandTotal((grandTotal) => grandTotal - (product.price - (product.price * product.discount / 100)))

            chnageQty((qty-1),((qty - 1) * (product.price - (product.price * product.discount / 100))))
        }
    }

    async function chnageQty(qty,total){
        console.log("qty:- ",qty);
        console.log("total:- ",total)

        await getDoc(doc(fs, `carts`, `${user}`)).then((doc) => {
            if (doc.exists()) {

                let items = doc.data().products;

                const index = items.findIndex(item => item.productId == `${id}`);
                if (index !== -1) {
                    if(qty == 0){
                     items=items.splice(index-1,1)
                    }else{
                    console.log("update qty")
                    items[index] = {
                        productId: `${id}`,
                        qty: Number(qty),
                        total: Number(total)      
                    }
                }
                    updateItemInDoc(items);
                } 
            } 
        })
    }

    async function updateItemInDoc(items){
        await updateDoc(doc(fs, `carts`, `${user}`), {
            products:items
        });
    }

    const removeProduct = async () => {
       
        await chnageQty(0,0);
        
        setRemoveProduct((remove) => remove + 1)
        setTimeout(()=>{
            toast("Product remove from cart")
        },1000)
       
    }

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
                            <p><button className='removeProduct' onClick={removeProduct}><a class="link" href="#">Remove</a></button></p>
                        </article>
                    </article>

                    <div>
                        <p class="price">$ {(product.price - (product.price * product.discount / 100))}</p>
                        <article class="quantity">
                            <label for="quantity" style={{ marginBottom: '-3px' }}>Quantity</label>
                            <div>
                                <button type="button" class={`btn-less-${id}`} onClick={removeQty}>-</button>
                                <input
                                    id={`qty${id}`}
                                    min={1}
                                    type="number"
                                    name="quantity"
                                    value={qty}
                                    style={{
                                        border: '1px',
                                        margin: '0'
                                    }}
                                />

                                <button type="button" class={`btn-more-${id}`} onClick={addQty}>+</button>
                            </div>
                        </article>
                        <p class="price total">$ {total}</p>
                    </div>
                </section>
            )}

         
        <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce />
        </section>
        

    );
}

export default CartItem;
