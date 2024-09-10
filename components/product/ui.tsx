"use client";

import { MotionButton, MotionDiv } from "@/lib/motion";
import { ProductController } from "@/types/products";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useMemo, useRef } from "react";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, X } from "lucide-react";
import { formatNumberWithCommas } from "@/utils/functions";
import { useAppSelector } from "@/lib/redux/store";

export const CartActionButton = memo(() => {
  return <MotionDiv></MotionDiv>;
});

export const CartAction = memo(
  ({
    product,
    closeFn,
  }: {
    product: ProductController.Product;
    closeFn: () => void;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          closeFn();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        className="absolute bottom-[5%] left-0 w-full max-md:hidden"
        ref={ref}
      >
        <div className="mx-auto w-[90%] rounded-lg border border-[#d9d9d9] bg-white p-3">
          <div className="mb-1 flex items-center justify-between text-black">
            <span className="text-sm">Select size</span>
            <Button variant="ghost" size="sm" onClick={closeFn}>
              <X width={16} />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 max-md:grid-cols-3">
            {product.sizes.map(size => (
              <Button
                variant={"outline"}
                size="sm"
                key={size.id}
                className="text-xs font-semibold text-black"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export const ProductImage = memo(
  ({
    product,
    showCartActionButton,
    showCartAction,
    displayCartAction,
    hideCartButton,
    hideCartAction,
    displayMobileCartAction,
  }: {
    product: ProductController.Product;
    showCartActionButton: boolean;
    showCartAction: boolean;
    hideCartButton: () => void;
    displayCartAction: () => void;
    hideCartAction: () => void;
    displayMobileCartAction: () => void;
  }) => {
    const productHasSizes = useMemo(() => product.sizes.length > 0, [product]);

    const action = () => {
      if (productHasSizes) {
        displayCartAction();
      }
    };

    const mobileAction = () => {
      if (productHasSizes) {
        displayMobileCartAction();
      }
    };

    return (
      <div className="relative hover:shadow-md">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.medias[0].path}
            alt="product image"
            width={260}
            height={260}
            priority
            className="aspect-[4/6] w-full object-cover"
          />
        </Link>
        <AnimatePresence>
          {showCartActionButton && (
            <MotionDiv
              className="absolute bottom-[5%] left-0 flex w-full items-center justify-center max-md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <MotionButton
                className="w-[70%] rounded-full bg-black text-xs font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action}
              >
                Quick Add
              </MotionButton>
            </MotionDiv>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCartAction && (
            <CartAction product={product} closeFn={hideCartAction} />
          )}
        </AnimatePresence>
        <MotionDiv
          className="absolute bottom-0 left-0 flex w-full items-center justify-end p-3 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MotionButton
            className="flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#f0f0f0]"
            onClick={mobileAction}
            size={"icon"}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart width={16} color="#000" />
          </MotionButton>
        </MotionDiv>
      </div>
    );
  }
);

export const ProductInfo = memo(
  ({ id, name, price }: { id: number; name: string; price: number }) => {
    const user = useAppSelector(state => state.user);

    return (
      <div className="py-2">
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${id}`}
            className="text-sm font-semibold text-black transition-colors hover:text-normal_grey"
          >
            {name}
          </Link>
          {!!user && (
            <Button variant={"ghost"} size={"sm"} className="self-start">
              <Heart width={16} />
            </Button>
          )}
        </div>
        <p className="text-lg font-bold max-md:text-base">
          ${formatNumberWithCommas(price)}
        </p>
        <p className="text-xs font-semibold text-primary">
          Buy one, get one free
        </p>
      </div>
    );
  }
);

ProductImage.displayName = "ProductImage";
CartAction.displayName = "CartAction";
ProductInfo.displayName = "Menu";
CartActionButton.displayName = "CartActionButton";
