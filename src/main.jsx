import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/css/App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Banner from './components/Banner.jsx'
import Products from './components/Products.jsx'
import Benefits from './components/Benefits.jsx'
import Testimonial from './components/Testimonial.jsx'
import PopularProducts from './components/PopularProducts.jsx'
import Header from './components/Header.jsx'
import Cart from './components/Cart.jsx'
import ProductDetails from './components/Product-Details.jsx'
import Authentication from './components/Authentication.jsx'
import Thanks from './components/Thanks.jsx'
import Footer from './components/Footer.jsx'
import Addproduct from './components/Addproduct.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Shipping from './components/Shipping.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
     <Route path='' element={
      <>
      <Header />
      <main>
       <Banner />
        <Products />
        <Benefits />
        <Testimonial />
        <PopularProducts />
        </main>
        <Footer/>
      </>
     } />
     <Route path='cart' element={
      <>
      <Header />
      <main>
        <Cart/>
        </main>
        <Footer/>
        </>
     } />
     <Route path='product/:id' element={
        <>
        <Header />
      <main>
        <ProductDetails/>
        </main>
        <Footer/>
        </>
     } />
     <Route path='authentication' element={
       <Authentication/>
     } />
     <Route path='shipping' element={
       <Shipping/>
     } />
      <Route path='thanks' element={
       <Thanks/>
     } />
     <Route path='add-product' element={
       <Addproduct/>
     } />
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
   
    <RouterProvider router={router} />
   
    </Provider>,
)

