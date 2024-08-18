import { CartInterface, Product, CheckoutInterface } from "@lib/types";
import React from "react";
import Cookie from "js-cookie";
import router from "next/router";

export default function useCheckout() {
  const compute = (cart: CartInterface[]) => {
    const subtotal = cart.reduce<number>((total, cart) => {
      let { price, discountPercentage } = cart.product as Product;
      let cartTotalPrice =
        (price as number) * cart.quantity -
        (price as number) * (discountPercentage / 100);
      return total + cartTotalPrice;
    }, 0);

    const discount = Math.floor(
      cart.reduce<number>((totalDiscount, cart) => {
        let discountPercentage = cart.product.discountPercentage!;

        let discountTotal =
          (discountPercentage / 100) *
          (cart.product!?.price as number) *
          cart.quantity;
        return totalDiscount + discountTotal;
      }, 0)
    );

    const total = subtotal - discount + 3500;

    return { total, discount, subtotal };
  };

  const handleCheckout = (cart: CartInterface[]) => {
    let checkout: CheckoutInterface<CartInterface> = {
      cart,
      ...compute(cart),
    };

    //Set current checkout to cookie to get it in the checkout page
    Cookie.set("checkout", JSON.stringify(checkout), { expires: 7 });
    router.push("/checkout/");
  };

  return { compute, handleCheckout };
}
