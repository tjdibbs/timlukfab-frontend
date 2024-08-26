"use client";

import { Product } from "@/data";
import { MotionDiv } from "@/lib/motion";
import { addToCart } from "@/lib/redux/features/cart";
import { useAppDispatch } from "@/lib/redux/store";
import { CartItem } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { X } from "react-feather";
import { v4 as uuidV4 } from "uuid";
import { useCart } from "../cart/cartProvider";

type Props = {
  closeFn: () => void;
  product: Product;
};

const CartAction = memo(({ closeFn, product }: Props) => {
  const dispatch = useAppDispatch();

  const { openCart } = useCart();

  const addItemToCart = (size: string) => {
    const cartItem: CartItem = {
      id: uuidV4(),
      productId: product.id,
      quantity: 1,
      size,
      price: product.price,
      title: product.name,
      image: product.image,
    };
    dispatch(addToCart(cartItem));
    closeFn();
    openCart();
  };

  return (
    <AnimatePresence>
      <MotionDiv
        key={uuidV4()}
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        exit={{ y: 10 }}
        className="absolute bottom-[5%] left-0 w-full max-md:hidden"
      >
        <div className="mx-auto w-[90%] rounded-lg border border-[#d9d9d9] bg-white p-3">
          <div className="mb-1 flex items-center justify-between">
            <span>Select size</span>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
              onClick={closeFn}
            >
              <X className="w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 max-md:grid-cols-3">
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={() => addItemToCart("XS")}
            >
              XS
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={() => addItemToCart("S")}
            >
              S
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={() => addItemToCart("M")}
            >
              M
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={() => addItemToCart("L")}
            >
              L
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={() => addItemToCart("XL")}
            >
              XL
            </button>
          </div>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
});

CartAction.displayName = "CartAction";
export default CartAction;
