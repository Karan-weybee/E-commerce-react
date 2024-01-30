import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Products: [],
    categories:[],
    priceRange:[0,7500]
    

}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setCategories:(state,action)=>{
        state.categories = action.payload;
        console.log(state.categories)
      },
      setPriceRange:(state,action)=>{
        state.priceRange = [...action.payload]
        console.log(state.priceRange);
      }
    }
})



export const {setCategories,setPriceRange} = productSlice.actions

export default productSlice.reducer