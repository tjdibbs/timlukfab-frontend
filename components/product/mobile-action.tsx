"use client";

import { MotionButton, MotionDiv } from "@/lib/motion";
import { ProductController } from "@/types/products";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useAddToCartMutation } from "@/lib/redux/services/cart";
import { CartController } from "@/types/cart";
import useMessage from "@/hooks/useMessage";
import { TailwindSpinner } from "../ui/spinner";

type Props = {
  product: ProductController.Product;
  closeFn: () => void;
  isOpen: boolean;
};

const MobileCartAction = ({ product, closeFn, isOpen }: Props) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const { alertMessage } = useMessage();

  const handleAddToCart = async (id: number) => {
    try {
      const payload: CartController.AddItem = {
        productId: product.id,
        productColorId: product.colors[0].id,
        productSizeId: id,
        quantity: 1,
      };
      await addToCart(payload).unwrap();
      alertMessage("Product added to cart", "success");
      closeFn();
    } catch (error) {
      console.log(error);
      alertMessage("Something went wrong", "error");
    }
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
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999999] flex h-screen w-full items-end justify-center bg-black/40 backdrop-blur-sm md:hidden"
        >
          <MotionDiv
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-lg"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Select size</h2>
                {isLoading && <TailwindSpinner className="h-4 w-4" />}
              </div>
              <Button
                variant={"ghost"}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={closeFn}
                disabled={isLoading}
              >
                <X width={20} />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map(size => (
                <MotionButton
                  variant={"outline"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={size.id}
                  disabled={isLoading}
                  onClick={() => handleAddToCart(size.id)}
                >
                  {size.name}
                </MotionButton>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
export default MobileCartAction;
