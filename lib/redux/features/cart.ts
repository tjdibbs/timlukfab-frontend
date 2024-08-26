"use client"

import { CartItem } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getCart = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem("cart")
        return cart ? JSON.parse(cart) : []
    }
    return []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: getCart() as CartItem[],
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = state.find((item) => item.productId === action.payload.productId && item.size === action.payload.size)
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.push(action.payload)
            }
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            const newState = state.filter((item) => item.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify([...newState]))
            return [...newState]
        },
        clearCart: (state) => {
            state = []
            localStorage.removeItem("cart")
        },
        incrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const item = state.find((item) => item.id === action.payload.id)
            if (item) {
                item.quantity += 1
            }
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        decrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const item = state.find((item) => item.id === action.payload.id)
            if (item) {
                item.quantity -= 1
            }
            localStorage.setItem("cart", JSON.stringify([...state]))
        }
    }
})

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer