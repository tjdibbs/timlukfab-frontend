import { Product } from "@/data";
import { addToCart } from "@/lib/redux/features/cart";
import { useAppDispatch } from "@/lib/redux/store";
import { CartItem } from "@/lib/types";
import { Divider } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect } from "react";
import { X } from "react-feather";
import { v4 as uuidV4 } from "uuid";
import { useCart } from "../cart/cartProvider";

type Props = {
  isOpen: boolean;
  product: Product;
  closeFn: () => void;
};

const MobileCartAction = memo(({ closeFn, isOpen, product }: Props) => {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      <motion.div
        key={uuidV4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-[9999999] h-full w-full bg-black/10 backdrop-blur-sm md:hidden"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="fixed bottom-0 left-0 z-[9999999] w-full rounded-lg border border-[#d9d9d9] bg-white p-3"
        >
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg">Select size</span>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
              onClick={closeFn}
            >
              <X className="w-5" />
            </button>
          </div>
          <Divider />
          <div className="grid grid-cols-4 gap-2">
            <button
              className="rounded border border-[#d9d9d9] p-2 text-xs font-semibold transition-all duration-150 ease-linear hover:border-black"
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

MobileCartAction.displayName = "MobileCartAction";
export default MobileCartAction;
