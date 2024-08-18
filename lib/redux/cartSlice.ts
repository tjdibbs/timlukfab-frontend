import { BASE_URL } from "../constants";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, CartInterface } from "../types";
import Cookie from "js-cookie";

type updateParams = {
  cart_id: string;
  userid?: string;
  fields: Partial<CartInterface>;
};

const CART_URL = BASE_URL + "/api/cart/";

type setParams = { userid?: string; cart: CartInterface[] };
type addParams = { user?: string; cart: Partial<CartInterface> };
type deleteParams = { userid?: string; cart_id: string };

export const addToCarts = createAsyncThunk(
  "shop/cart/add",
  async (params: addParams) => {
    try {
      //   if no user, that means the user hasn't signed in
      //   return the cart to be added to user local cart
      if (!params.user) return params.cart;

      await axios.put(CART_URL + "/new", {
        cart: [params.cart],
        user: params.user,
      });

      return params.cart;
    } catch (e: any) {
      return params.cart;
    }
  }
);

export const deleteCart = createAsyncThunk(
  "shop/cart/delete",
  async (params: deleteParams) => {
    try {
      if (!params.userid) return params;
      await axios.delete(CART_URL + params.userid + "/" + params.cart_id);
      return params;
    } catch (e: any) {
      return params;
    }
  }
);

export const updateCarts = createAsyncThunk(
  "shop/cart/update",
  async (params: updateParams) => {
    try {
      if (!params.userid) return params;
      await axios.post(
        BASE_URL + "/api/cart/" + params.userid + "/" + params.cart_id,
        params.fields
      );

      return params;
    } catch (e: any) {
      return params;
    }
  }
);

export const setAllCarts = createAsyncThunk(
  "shop/cart/set",
  async (params: setParams) => {
    try {
      if (!params.userid) return params.cart;
      await axios.put<{ success: boolean }>(
        CART_URL + params.userid,
        params.cart
      );

      return params.cart;
    } catch (e: any) {
      return params.cart;
    }
  }
);

export const CartBuilder = (builder: ActionReducerMapBuilder<AppState>) => {
  // add cart fulfilled callback
  builder.addCase(
    addToCarts.fulfilled,
    (state, actions: PayloadAction<Partial<CartInterface>>) => {
      state.cart.push(actions.payload);

      if (
        state.user &&
        !state.user?.cart.includes(actions.payload.id as string)
      ) {
        state.user?.cart.push(actions.payload.id as string);
      }

      Cookie.set("cart", JSON.stringify(state.cart), { expires: 30 });
    }
  );

  // cart update request fulfilled callback
  builder.addCase(updateCarts.fulfilled, (state, actions) => {
    const { cart_id, fields } = actions.payload;

    state.cart = state.cart.map((cart) => {
      if (cart.id === cart_id) return { ...cart, ...fields };
      return cart;
    });

    console.log({ cart: state.cart });

    Cookie.set("cart", JSON.stringify(state.cart), { expires: 30 });
  });

  // cart delete request fulfilled callback
  builder.addCase(deleteCart.fulfilled, (state, actions) => {
    state.cart = state.cart.filter(
      (cart) => cart.product?.id !== actions.payload.cart_id
    );
    Cookie.set("cart", JSON.stringify(state.cart), { expires: 30 });
  });

  // set all user cart fulfilled callback
  builder.addCase(setAllCarts.fulfilled, (state, actions) => {
    state.cart = actions.payload;
    Cookie.set("cart", JSON.stringify(state.cart), { expires: 30 });
  });
};
