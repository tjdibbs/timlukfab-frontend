"use client";

import { CheckoutInterface, CartInterface, Product } from "@lib/types";
import { Box, Button, Card, Divider, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cookie from "js-cookie";
import useCheckout from "@hook/useCheckout";
import { useAppSelector } from "@/lib/_redux/store";

function Checkout() {
  const cart = useAppSelector((state) => state.shop.cart) as CartInterface[];
  const { compute, handleCheckout } = useCheckout();

  if (!cart?.length) return <></>;

  const { subtotal, total, discount } = compute(cart);

  const checkout = () => handleCheckout(cart);

  return (
    <div className="card relative h-full bg-white/70 pb-20 backdrop-blur-lg">
      <div className="flex gap-x-3 p-4 font-bold">
        <ShoppingCartCheckoutIcon />
        <span>Cart Totals</span>
      </div>
      <Divider />
      <Box role={"application"} className="flex flex-col py-4">
        <div className="subtotal items-between flex justify-between p-2">
          <div className="label">Subtotal:</div>
          <div className="amount font-bold">
            {"₦" + subtotal.toLocaleString()}
          </div>
        </div>
        <div className="discount items-between flex justify-between p-2">
          <div className="label">Discount:</div>
          <div className="amount font-bold">
            {"₦" + discount.toLocaleString()}
          </div>
        </div>
        <div className="shipping items-between flex justify-between p-2">
          <div className="label">Shipping:</div>
          <div className="amount text-sm font-bold">
            {"₦" + (3_500).toLocaleString()} via GIG park
          </div>
        </div>
        <Divider />
        <div id={"total"} className="mt-6 flex justify-between p-2">
          <span>Total</span>
          <b className="text-primary-low rounded-lg bg-black/5 px-3 py-2 shadow-sm">
            ₦{total.toLocaleString("en")}
          </b>
        </div>
        <div className="actions absolute bottom-0 left-0 w-full p-3">
          <Button
            variant={"contained"}
            size={"large"}
            className="bg-primary-low w-full rounded-lg font-bold"
            onClick={checkout}
          >
            Checkout
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default React.memo(Checkout);
