import { User } from "@/lib/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const getUser = (): User | null => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user")
        if (user) {
            return JSON.parse(user) as User
        }
    }
    return null
}

const userSlice = createSlice({
    name: "user",
    initialState: getUser(),
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state = action.payload
            localStorage.setItem("user", JSON.stringify(state))
        },
        logoutOutUser: (state) => {
            state = null
            localStorage.removeItem("user")
        }
    }
})

export const { setUser, logoutOutUser } = userSlice.actions
export default userSlice.reducer