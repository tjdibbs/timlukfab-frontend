import { BASE_URL } from "../constants";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, CartInterface } from "@lib/types";
import Cookie from "js-cookie";

const WISH_URL = BASE_URL + "/api/wish/";

type setParams = { userid?: string; wishes: string[] };
type addParams = { userid?: string; wish: string };
type deleteParams = { userid?: string; wish: string };

export const addToWish = createAsyncThunk(
  "shop/wish/add",
  async (params: addParams) => {
    try {
      //   if no user, that means the user hasn't signed in
      //   return the wish to be added to user local wish
      if (!params.userid) return params.wish;

      await axios.put(WISH_URL + "/new", {
        wishes: [params.wish],
        user: params.userid,
      });

      return params.wish;
    } catch (e: any) {
      return params.wish;
    }
  }
);

export const deleteWish = createAsyncThunk(
  "shop/wish/delete",
  async (params: deleteParams) => {
    try {
      if (!params.userid) return params;
      await axios.delete(WISH_URL + params.userid + "/" + params.wish);
      return params;
    } catch (e: any) {
      return params;
    }
  }
);

export const setAllWishes = createAsyncThunk(
  "shop/wish/set",
  async (params: setParams) => {
    try {
      if (!params.userid) return params.wishes;
      await axios.put<{ success: boolean }>(
        WISH_URL + params.userid,
        params.wishes
      );

      return params.wishes;
    } catch (e: any) {
      return params.wishes;
    }
  }
);

export const wishBuilder = (builder: ActionReducerMapBuilder<AppState>) => {
  // add cart fulfilled callback
  builder.addCase(
    addToWish.fulfilled,
    (state, actions: PayloadAction<string>) => {
      state.wishlist.push(actions.payload);

      if (state.user && !state.user?.wishlist.includes(actions.payload)) {
        state.user?.wishlist.push(actions.payload);
      }

      Cookie.set("wishlist", JSON.stringify(state.wishlist), { expires: 30 });
    }
  );

  // wishlist delete request fulfilled callback
  builder.addCase(deleteWish.fulfilled, (state, actions) => {
    state.wishlist = state.wishlist.filter(
      (wish) => wish !== actions.payload.wish
    );

    if (state.user) {
      // remove from user wishlist object
      state.user = {
        ...state.user,
        wishlist: state.user.wishlist.filter(
          (wish) => wish != actions.payload.wish
        ),
      };
    }

    Cookie.set("wishlist", JSON.stringify(state.wishlist), { expires: 30 });
  });

  // set all user wishlist fulfilled callback
  builder.addCase(setAllWishes.fulfilled, (state, actions) => {
    state.wishlist = actions.payload;
    Cookie.set("wishlist", JSON.stringify(state.wishlist), { expires: 30 });
  });
};
