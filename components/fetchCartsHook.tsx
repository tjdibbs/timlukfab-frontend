"use client";

import axios from "axios";
import { setAllCarts } from "@/lib/_redux/cartSlice";
import { auth } from "@/lib/_redux/reducer";
import { useAppDispatch, useAppSelector } from "@/lib/_redux/store";
import { AppState, CartInterface } from "lib/types";
import { useSnackbar } from "notistack";
import React from "react";
import merge from "utils/merge";

interface Props {
  user: AppState["user"];
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FetchCartsHook(props: Props) {
  const { cart } = useAppSelector((state) => state.shop);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { loading, setLoading } = props;

  React.useEffect(() => {
    // const FetchProductCarts = (userCarts?: CartInterface[]) => {
    //   let allIds;
    //   let merged = cart;
    //   if (!userCarts?.length && !cart?.length) {
    //     setLoading!(false);
    //     return;
    //   }
    //   if (userCarts?.length) {
    //     merged = merge<CartInterface>([...cart, ...userCarts!]);
    //     allIds = merged.reduce<string[]>((allIds, cart) => {
    //       allIds.push(cart.product_id);
    //       return allIds;
    //     }, []);
    //   } else {
    //     allIds = merged.reduce<string[]>((allIds, cart) => {
    //       allIds.push(cart.product_id);
    //       return allIds;
    //     }, []);
    //   }
    //   axios
    //     .post<{ success: boolean; products: CartInterface["product"][] }>(
    //       "/api/cart/",
    //       allIds
    //     )
    //     .then(({ data }) => {
    //       let { success, products } = data;
    //       if (success && products?.length) {
    //         merged = merged.map((cart, index) => {
    //           let product = products?.find((p) => p!.id === cart.product_id);
    //           return {
    //             ...cart,
    //             product,
    //           };
    //         });
    //       }
    //       dispatch(setAllCarts({ userid: props.user!?.id, cart: merged })).then(
    //         () => {
    //           setLoading!(false);
    //         }
    //       );
    //     })
    //     .catch((e: any) => {
    //       enqueueSnackbar(e.message, {
    //         variant: "error",
    //         anchorOrigin: {
    //           vertical: "top",
    //           horizontal: "left",
    //         },
    //       });
    //     });
    // };
    // dispatch(auth(props.user));
    // // @ts-ignore
    // FetchProductCarts(JSON.parse(props.user!?.cart || "[]") as Product[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return;
}
