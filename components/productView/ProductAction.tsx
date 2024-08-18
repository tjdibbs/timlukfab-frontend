import React from "react";
import { Button, CardActions, IconButton, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import useCheckout from "@hook/useCheckout";
import { Product, CartInterface } from "@lib/types";
import { deleteCart, addToCarts } from "@lib/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import useMessage from "@hook/useMessage";
import { UseFormGetValues } from "react-hook-form";
import { State } from "./content";
import _ from "lodash";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useShop from "@hook/useShop";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

function ProductAction(props: {
  product: Product;
  getValues: UseFormGetValues<State>;
}) {
  const { product, getValues } = props;
  const { handleCheckout } = useCheckout();
  const { cart, user, wishlist } = useAppSelector((state) => state.shop);

  const inCart = cart.findIndex((cart) => cart.product?.id === product.id);
  const inWishlist = wishlist.includes(product.id);

  const { handleAddCart, handleRemoveCart, handleWish, loading } =
    useShop(product);

  const { size, color, quantity } = getValues();

  const checkout = () => {
    handleCheckout([
      {
        id: nanoid(),
        user: user?.id as string,
        product: {
          ..._.pick(product, ["id", "title", "price", "discountPercentage"]),
          image: JSON.parse(product.images || "[]")[0],
        },
        quantity: quantity as number,
        sizes: [size],
        colors: [color],
      },
    ]);
  };

  const addCart = () => {
    handleAddCart({
      id: product.id,
      user: user?.id as string,
      product: {
        id: product.id,
      },
      quantity: parseInt(quantity as string),
      colors: color ? [color] : [],
      sizes: size ? [size] : [],
    });
  };

  let className =
    inCart === -1
      ? "btn-outlined ring-slate-600 text-gray-600"
      : "btn text-white bg-slate-600";

  return (
    <div className="product-actions md:absolute bottom-0 left-0 w-full sm:px-4">
      {product.stock - product.sold > 0 ? (
        <div className="flex gap-x-4 items-center my-5">
          <motion.button
            key={inCart}
            animate={{ scale: 1, opacity: 1 }}
            onClick={inCart === -1 ? addCart : handleRemoveCart}
            className={`text-sm ${className} disabled:animate-pulse scale-75 opacity-50`}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : inCart !== -1
              ? "Remove from cart"
              : "Add to cart"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={checkout}
            className={`text-sm btn bg-primary-low text-white`}
            disabled={loading}
          >
            Buy Now
          </motion.button>
          <div className="wish flex-grow flex justify-end">
            <IconButton className="bg-white shadow-lg" onClick={handleWish}>
              {inWishlist ? (
                <Favorite className="text-primary-low" />
              ) : (
                <FavoriteBorderOutlined className="text-primary-low" />
              )}
            </IconButton>
          </div>
        </div>
      ) : (
        <Typography variant={"subtitle1"} color={"error"}>
          Sorry: Products is out of stock
        </Typography>
      )}
    </div>
  );
}

export default dynamic(async () => ProductAction, { ssr: false });
