import React,{useState,useEffect} from 'react';
import SingleProduct from './SingleProduct';
import '../css/Products.scss'

const Products = () => {

    const [images, setImages] = useState([]);
    if(images[0] != undefined){

        console.log(images[0].default)
    }
    useEffect(() => {
      const importImages = async () => {
        const image1 = await import('../img/fotos/products/spiced-mint-mobile.png');
        const image2 = await import('../img/fotos/products/spiced-mint.png');
       
        // Add more images as needed
  
        setImages([image1, image2]);
      };
  
      importImages();
    }, []);

    const cards = [<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>,<SingleProduct/>]
    return (
        <section id="products" class="container section-products">
            <section class="title-section">
                <h2 class="title">Products</h2>
                <p>Order it for you or for your beloved ones</p>
            </section>
            <section class="cards">
            
              {cards}
              
            </section>
            <div id="see-more-product" class="button btn-see-more">
                See more
            </div>
        </section>
    );
}

export default Products;
