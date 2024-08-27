import { Product } from "@/data";
import { addToCart } from "@/lib/redux/features/cart";
import { useAppDispatch } from "@/lib/redux/store";
import { CartItem } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect } from "react";
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

  const sizes = ["XS", "S", "M", "L", "XL"];

  const addItemToCart = useCallback(
    (size: string) => {
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
    },
    [dispatch, openCart, product, closeFn],
  );

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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999999] flex items-end justify-center bg-black/40 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-lg"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Select size</h2>
              <button
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={closeFn}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border-2 border-gray-300 py-3 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={() => addItemToCart(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

MobileCartAction.displayName = "MobileCartAction";
export default MobileCartAction;
