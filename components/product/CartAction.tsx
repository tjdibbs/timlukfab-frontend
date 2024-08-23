"use client";

import { MotionDiv } from "@/lib/motion";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { X } from "react-feather";
import { v4 as uuidV4 } from "uuid";

type Props = {
  closeFn: () => void;
};

const CartAction = memo(({ closeFn }: Props) => {
  const addToCart = () => {
    closeFn();
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
              onClick={addToCart}
            >
              XS
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={addToCart}
            >
              S
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={addToCart}
            >
              M
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={addToCart}
            >
              L
            </button>
            <button
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
              onClick={addToCart}
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
