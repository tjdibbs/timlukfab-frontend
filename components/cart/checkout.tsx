import { CheckoutInterface, CartInterface, Product } from "@lib/types";
import { Box, Button, Card, Divider, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cookie from "js-cookie";
import router from "next/router";
import useCheckout from "@hook/useCheckout";
import { useAppSelector } from "@lib/redux/store";

function Checkout() {
  const cart = useAppSelector((state) => state.shop.cart) as CartInterface[];
  const { compute, handleCheckout } = useCheckout();

  if (!cart?.length) return <></>;

  const { subtotal, total, discount } = compute(cart);

  const checkout = () => handleCheckout(cart);

  return (
    <div className="card h-full relative bg-white/70 backdrop-blur-lg pb-20">
      <div className="p-4 flex gap-x-3 font-bold">
        <ShoppingCartCheckoutIcon />
        <span>Cart Totals</span>
      </div>
      <Divider />
      <Box role={"application"} className="py-4 flex flex-col">
        <div className="subtotal flex justify-between items-between p-2">
          <div className="label">Subtotal:</div>
          <div className="amount font-bold">
            {"₦" + subtotal.toLocaleString()}
          </div>
        </div>
        <div className="discount flex justify-between items-between p-2">
          <div className="label">Discount:</div>
          <div className="amount font-bold">
            {"₦" + discount.toLocaleString()}
          </div>
        </div>
        <div className="shipping flex justify-between items-between p-2">
          <div className="label">Shipping:</div>
          <div className="amount font-bold text-sm">
            {"₦" + (3_500).toLocaleString()} via GIG park
          </div>
        </div>
        <Divider />
        <div id={"total"} className="flex justify-between mt-6 p-2">
          <span>Total</span>
          <b className="bg-black/5 px-3 py-2 text-primary-low rounded-lg shadow-sm">
            ₦{total.toLocaleString("en")}
          </b>
        </div>
        <div className="actions absolute bottom-0 left-0 p-3 w-full">
          <Button
            variant={"contained"}
            size={"large"}
            className="bg-primary-low w-full rounded-lg font-bold "
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
