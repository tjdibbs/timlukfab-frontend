"use client";

import { MotionButton, MotionDiv } from "@/lib/motion";
import { ProductController } from "@/types/products";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

type Props = {
  product: ProductController.Product;
  closeFn: () => void;
  isOpen: boolean;
};

const MobileCartAction = ({ product, closeFn, isOpen }: Props) => {
  useEffect(() => {
    console.log("is displaying");
  }, []);

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
              <h2 className="text-xl font-semibold">Select size</h2>
              <Button
                variant={"ghost"}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={closeFn}
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
