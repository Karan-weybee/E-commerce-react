import React, { useState } from 'react';
import { fs, storage } from '../Config/Config'
import {getDownloadURL,ref,uploadBytes } from 'firebase/storage'
import { addDoc,collection } from 'firebase/firestore';
import '../css/Addproduct.scss'

const Addproduct = () => {

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [discount,setDiscount]=useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function addProduct(e) {
        e.preventDefault();

        const storageRef = ref(storage,`product-images/${image.name}`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, image).then((snapshot) => {

            getDownloadURL(ref(storage, `product-images/${image.name}`))
            .then( (url) => {
                 addDoc(collection(fs, "products"), {
                    title: title,
                    discription: discription,
                    category: category,
                    price: Number(price),
                    discount:Number(discount),
                    quantity: Number(quantity),
                    url: url
                }).then(() => {
                    setSuccessMsg("product Added SuccessFully");
                    setTitle('');
                    setDiscription('');
                    setCategory('');
                    setPrice('');
                    setDiscount('');
                    setQuantity('');
                    document.getElementById('image').value = '';
                    setErrorMsg('');
                    setImageError('')
                }).catch(error => {
                    setErrorMsg(error.message)
                })
            })
            .catch((error) => {
                setErrorMsg(error.message)
            });
        });


        console.log("product added")
    }

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG',]
    const handleUploadImage = (e) => {
        let selectedFile = e.target.files[0];

        if (selectedFile) {

            if (types.includes(selectedFile.type)) {
                setImage(selectedFile)
                setImageError("")
            } else {
                setImage(null)
                setImageError("Please Select Valid Type (png,jpeg or jpg)")
            }
        }
        else {
            setImageError("Please Select your file")
        }
    }
    return (<div className="addproduct">

        <div class="container Addcontainer">
            <div className="uploadSuccessMsg">
                {successMsg && (<>{successMsg}</>)}
            </div>
            <form onSubmit={addProduct}>
                <div class="row">
                    <div class="col-25">
                        <label for="fname">Product Name</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="fname" name="firstname" placeholder="Your name.."
                            onChange={(e) => setTitle(e.target.value)} value={title}
                            required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="lname">Product Discription</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.."
                            onChange={(e) => setDiscription(e.target.value)} value={discription}
                            required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="country">Category</label>
                    </div>
                    <div class="col-75">
                        <select id="country" name="country"
                            onChange={(e) => setCategory(e.target.value)} value={category}
                            required>
                            <option value="">Select Category</option>
                            <option value="Floral">Floral</option>
                            <option value="Fresh">Fresh</option>
                            <option value="Woody">Woody</option>
                            <option value="Oriental">Oriental</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="lname">Price</label>
                    </div>
                    <div class="col-75">
                        <input type="number" id="price" name="price" placeholder="Price.."
                            onChange={(e) => setPrice(e.target.value)} value={price}
                            required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="lname">Discount in %</label>
                    </div>
                    <div class="col-75">
                        <input type="number" min={0} max={100} id="discount" name="discount" placeholder="Discount.."
                            onChange={(e) => setDiscount(e.target.value)} value={discount}
                            required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="lname">Quantity</label>
                    </div>
                    <div class="col-75">
                        <input type="number" id="Quantity" name="Quantity" placeholder="Quantity.."
                            onChange={(e) => setQuantity(e.target.value)} value={quantity}
                            required />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="lname">Product Image</label>
                    </div>
                    <div class="col-75" style={{ marginBottom: '1em' }}>
                        <input type="file" id="image" name="image" placeholder="Image.."
                            onChange={handleUploadImage}
                            required />
                    </div>
                    <div className="imageError">
                        {imageError && (<>{imageError}</>)}
                    </div>
                </div>
                <div class="row">
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <div className="errorMsg">
                {errorMsg && (<>{errorMsg}</>)}
            </div>
        </div>
    </div>

    );
}

export default Addproduct;
