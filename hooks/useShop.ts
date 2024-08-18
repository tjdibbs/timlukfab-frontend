import React from "react";
import { CartInterface, Product } from "@lib/types";
import { addToCarts, deleteCart, updateCarts } from "@lib/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import useMessage from "./useMessage";
import { addToWish, deleteWish } from "@lib/redux/wishSlice";
import { nanoid } from "nanoid";

function useShop(item: Product) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const { user, cart, wishlist } = useAppSelector((state) => state.shop);
  const { alertMessage } = useMessage();

  const handleAddCart = (product?: CartInterface) => {
    setLoading(true);

    const cartProduct: Partial<CartInterface> = product ?? {
      id: nanoid(),
      user: user?.id,
      product: { id: item.id },
      quantity: 1,
    };

    dispatch(addToCarts({ user: user!?.id, cart: cartProduct }))
      .then(() => {
        alertMessage(item.title + " added to cart", "success");
      })
      .finally(() => setLoading(false));
  };

  const handleRemoveCart = () => {
    setLoading(true);
    dispatch(deleteCart({ userid: user?.id, cart_id: item.id }))
      .then(() => {
        alertMessage(item.title + " removed from cart", "warning");
      })
      .finally(() => setLoading(false));
  };

  const handleWish = () => {
    setLoading(true);
    let params = { userid: user?.id, wish: item.id };

    if (wishlist.includes(item.id)) {
      dispatch(deleteWish(params))
        .then(() => {
          alertMessage(item.title + " removed from wishlist", "warning");
        })
        .finally(() => setLoading(false));
    } else
      dispatch(addToWish(params))
        .then(() => {
          alertMessage(item.title + " added from wishlist", "info");
        })
        .finally(() => setLoading(false));
  };

  const handleCartChange = (fields: Partial<CartInterface>) => {
    dispatch(
      updateCarts({
        cart_id: item.id,
        userid: user?.id,
        fields,
      })
    );
  };

  return {
    handleAddCart,
    handleRemoveCart,
    handleWish,
    handleCartChange,
    loading,
  };
}

export default useShop;
