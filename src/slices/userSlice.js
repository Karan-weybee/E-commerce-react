import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId:(state,action)=>{
            state.user=action.payload.uid;
            console.log(state.user)
        },
        resetUserId:(state)=>{
            state.user=null;
            console.log(state.user)
        }
    }
})

export const userSelector = {
    getUser : (state)=>{ 
        console.log(state.user)
        return state.user;
    }
}

export const {setUserId,resetUserId} = userSlice.actions

export default userSlice.reducer