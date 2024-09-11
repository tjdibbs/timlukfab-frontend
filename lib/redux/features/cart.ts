"use client"


import { CartController } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: null as CartController.Cart | null,
    reducers: {
        setCart: (state, action: PayloadAction<CartController.Cart>) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer