import { AuthCredentials } from "@/lib/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const getAuthCredentials = (): AuthCredentials => {
    if (typeof window !== 'undefined') {
        const objString = localStorage.getItem("token") || Cookies.get("auth")
        if (objString) {
            const obj = JSON.parse(objString) as AuthCredentials
            if (!Cookies.get("auth")) {
                Cookies.set("auth", JSON.stringify({ id: obj.id, token: obj.token, refreshToken: obj.refreshToken }))
            }
            return { id: obj.id, token: obj.token, refreshToken: obj.refreshToken }
        }
    }
    return { id: null, token: null, refreshToken: null }
}

const authSlice = createSlice({
    name: "auth",
    initialState: getAuthCredentials(),
    reducers: {
        initializeAuth: (state) => {
            const { token, id, refreshToken } = getAuthCredentials()
            state.id = id
            state.token = token
            state.refreshToken = refreshToken
        },
        setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
            state.id = action.payload.id
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            Cookies.set("auth", JSON.stringify(state))
            localStorage.setItem("token", JSON.stringify(state))
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            Cookies.set("auth", JSON.stringify(state))
            localStorage.setItem("token", JSON.stringify(state))
        },
        logout: (state) => {
            state.token = null
            state.refreshToken = null
            state.id = null
            Cookies.remove("auth")
            localStorage.removeItem("token")
        }
    }
})

export const { setCredentials, logout, setAccessToken, initializeAuth } = authSlice.actions
export default authSlice.reducer