import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AppState, CartInterface, Product } from "../types";
import Cookie from "js-cookie";
import { CartBuilder } from "./cartSlice";
import getCurrentTheme from "lib/getCurrentTheme";
import { wishBuilder } from "./wishSlice";

const cart = Cookie.get("cart");
const wishlist = Cookie.get("wishlist");
const theme = Cookie.get("theme") as "light" | "dark" | "default";
const mode = "light";

const initialState: AppState = {
  // @ts-ignore
  mode,
  cart: JSON.parse(cart ?? "[]"),
  theme: theme ?? "default",
  wishlist: JSON.parse(wishlist ?? "[]"),
  loggedIn: false,
  device: "mobile",
};

const Shop = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCart: (state: AppState, actions: PayloadAction<CartInterface>) => {
      state.cart.push(actions.payload);
      Cookie.set("cart", JSON.stringify(state.cart));
    },
    setAllCart: (state: AppState, actions: PayloadAction<CartInterface[]>) => {
      state.cart = actions.payload;
      Cookie.set("cart", JSON.stringify(state.cart));
    },

    removeCart: (state: AppState, actions: PayloadAction<string>) => {
      let product = state.cart.findIndex((cart) => cart.id === actions.payload);
      state.cart.splice(product, 1);
      Cookie.set("cart", JSON.stringify(state.cart), { expires: 365 });
    },
    updateCart: (
      state: AppState,
      actions: PayloadAction<{
        id: string;
        field: string;
        value: string | number;
      }>
    ) => {
      const { id, field, value } = actions.payload;
      state.cart.forEach((cart, index) => {
        if (cart.id === id) {
          (
            state.cart[index] as {
              [x: string]: string | number | CartInterface["product"];
            }
          )[field] = value;
        }
      });

      Cookie.set("cart", JSON.stringify(state.cart), { expires: 365 });
    },
    setMode: (
      state: AppState,
      actions: PayloadAction<"light" | "dark" | "default">
    ) => {
      if (actions.payload === "default") {
        state.mode = getCurrentTheme();
      } else {
        state.mode = actions.payload;
      }

      state.theme = actions.payload;
      Cookie.set("theme", actions.payload);
    },
    auth: (state: AppState, actions: PayloadAction<AppState["user"]>) => {
      if (actions.payload) {
        state.user = actions.payload;
        state.loggedIn = true;
      } else {
        state.user = null;
      }
    },
  },
  extraReducers(builder) {
    // @reference react-toolkit async-thunk
    CartBuilder(builder);
    wishBuilder(builder);
  },
});

export const { setCart, removeCart, setAllCart, updateCart, setMode, auth } =
  Shop.actions;

export const cartLengths = (state: RootState) => state.shop.cart;

export default Shop.reducer;
