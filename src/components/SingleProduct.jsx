import React from 'react';
import {Link} from 'react-router-dom'
import '../css/SingleProduct.scss'

const SingleProduct = ({id,data}) => {

    console.log(id);
    console.log(data)

    // const discountedPrice = (data.price-(data.price*data.discount/100));
    // console.log(discountedPrice)
    return (
        <>
        {data && (
        <article class="card" key={id}>
        <Link to={`product/${id}`}>   
            <figure>
                <picture>
                    <source
                        media="(max-width:768px)"
                        srcset={data.url} style={{width:318, height:148,objectFit:'contain'}}/>
                    <img
                        src={data.url}
                        alt="product clean-lavander"
                        style={{width:255,height:177,objectFit:'contain'}}
                    />
                </picture>
            </figure>
            <article>
                <h2>{data.title}</h2>
                <p><del style={{color:'black',fontSize:'15px',marginRight:'10px'}}>{data.price}$</del> {(data.price-(data.price*data.discount/100))}$</p>
                <p style={{color:'black',fontSize:'15px'}}>Flat {data.discount}% Discount</p>
            </article>
        </Link>
    </article>
    )}
    </>
    );
}

export default SingleProduct;
