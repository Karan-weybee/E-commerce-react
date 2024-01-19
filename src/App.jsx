import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header';
import Banner from './components/Banner';
import Products from './components/Products';
import Footer from './components/Footer';
import Benefits from './components/Benefits';
import Testimonial from './components/Testimonial';
import PopularProducts from './components/PopularProducts';
import Cart from './components/Cart';
import ProductDetails from './components/Product-Details';
import Authentication from './components/Authentication';
import Thanks from './components/Thanks';

function App() {
  return (
    <>
      <Header />
      <main>

        <Banner />
        <Products />
        <Benefits />
        <Testimonial />
        <PopularProducts />
        {/* <Cart/> */}
        {/* <ProductDetails/> */}
        {/* <Authentication/> */}
        {/* <Thanks/> */}
      </main>
      <Footer /> 
      

    </>
  )
}

export default App;
