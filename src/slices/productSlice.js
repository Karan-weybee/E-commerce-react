import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Products: [],
    categories: [],
    priceRange: [0, 7500],
    dataLimit: 0,
    cartItems: 0


}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            console.log(state.categories)
        },
        setPriceRange: (state, action) => {
            state.priceRange = [...action.payload]
            console.log(state.priceRange);
        },
        setDataLimit: (state, action) => {
            console.log(action.payload)
            state.dataLimit = Number(action.payload)
            console.log(state.dataLimit)
        },
        setCartItems: (state, action) => {
            state.cartItems = Number(action.payload)
        },
        incrementCartItem: (state) => {
            state.cartItems = state.cartItems + 1;
        },
        decrementCartItem: (state) => {
            state.cartItems = state.cartItems - 1;
        }
    }
})



export const { setCategories, setPriceRange, setDataLimit, setCartItems, incrementCartItem,decrementCartItem } = productSlice.actions

export default productSlice.reducer