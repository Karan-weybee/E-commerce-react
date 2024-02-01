import { useEffect, useState } from 'react'
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
import Authentication from './components/CheckOut';
import Thanks from './components/Thanks';
import { useSelector } from 'react-redux';
import { getDoc,doc } from 'firebase/firestore';
import { fs } from './Config/Config';
import { Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { setCartItems } from './slices/productSlice';
import { useLocation } from 'react-router-dom';
import {
  Elements
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51OeAFgSGf7AKq6X3WiqzagHRjBlEpF3JNOIK0YfroX0n3tpr6xOdTnm5TkYdI4qwjkTSs3Ud4DMu8AiC3QtbEcFO00z2Pt58DP');

function App() {
  const {pathname}= useLocation();
  console.log(pathname)

  useEffect(()=>{
    window.scrollTo({top:0,behavior:'instant'})
  },[pathname])

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
   const [grandTotal,setGrandTotal]=useState(1);
   
  async function getGrandTotal() {
    await getDoc(doc(fs, `carts`, `${user}`)).then((document) => {
      if (document.exists()) {
        console.log("total")
        setGrandTotal((grandTotal) => (0))
        dispatch(setCartItems(document.data().products.length))
        document.data().products.map(async (product) => {
          console.log(product.total)
          setGrandTotal((grandTotal) => (grandTotal + product.total))
        })

      }
    })
  }
  useEffect(() => {
    if(user){
      getGrandTotal();
    }
    
  }, [user])

  
const options = {
  mode: 'payment',
  amount: grandTotal,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};


  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        {/* <Header />
      <main> */}
        <Outlet />
        {/* <Banner />
        <Products />
        <Benefits />
        <Testimonial />
        <PopularProducts /> */}
        {/* <Cart/> */}
        {/* <ProductDetails/> */}
        {/* <Authentication/> */}
        {/* <Thanks/> */}
        {/* </main>
      <Footer />  */}
      </Elements>
    </>
  )
}

export default App;
