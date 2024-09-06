"use client";

import { Product as PType } from "@/data";
import { formatNumberWithCommas } from "@/utils/functions";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Heart } from "react-feather";
import CartAction from "./CartAction";
import addToCartIcon from "@/assets/icons/add-to-cart-icon.svg";
import { createPortal } from "react-dom";
import MobileCartAction from "./MobileCartAction";
import { motion, AnimatePresence } from "framer-motion";
import useProductInteractions from "@/hooks/useProductInteractions";
import dynamic from "next/dynamic";
import Link from "next/link";

type Props = {
  product: PType;
  index: number;
};

const Product = ({ product, index }: Props) => {
  const {
    showCartAction,
    showCartActionButton,
    openMobileCartAction,
    showCartButton,
    hideCartButton,
    displayCartAction,
    displayMobileCartAction,
    hideCartAction,
    hideMobileCartAction,
  } = useProductInteractions();

  // Memoize static JSX elements
  const mobileCartActionButton = useMemo(
    () => (
      <motion.button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-[#f0f0f0]"
        onClick={displayMobileCartAction}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={addToCartIcon}
          alt="add to cart"
          height={24}
          width={24}
          className="max-w-5"
        />
      </motion.button>
    ),
    [displayMobileCartAction]
  );

  const productImage = useMemo(
    () => (
      <Image
        src={product.image}
        height={260}
        width={260}
        alt={product.name}
        className="h-full w-full max-w-full object-cover transition-transform duration-700 ease-linear hover:scale-105"
      />
    ),
    [product.image, product.name]
  );

  return (
    <motion.div
      className="relative mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {openMobileCartAction &&
        createPortal(
          <MobileCartAction
            product={product}
            closeFn={hideMobileCartAction}
            isOpen={openMobileCartAction}
          />,
          document.body
        )}
      <motion.div
        className="product-link relative block h-96 cursor-pointer overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md max-lg:h-72 max-md:h-64 max-sm:h-56"
        onMouseEnter={showCartButton}
        onMouseLeave={hideCartButton}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {productImage}
        <motion.div
          className="absolute bottom-0 left-0 flex w-full items-center justify-end p-3 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {mobileCartActionButton}
        </motion.div>
        <AnimatePresence>
          {showCartActionButton && (
            <motion.div
              className="absolute bottom-[5%] left-0 flex w-full items-center justify-center max-md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="w-44 rounded-full bg-black py-4 text-xs font-semibold text-white shadow-md transition-colors hover:bg-gray-800"
                onClick={displayCartAction}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quick Add
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        {showCartAction && (
          <CartAction closeFn={hideCartAction} product={product} />
        )}
      </motion.div>
      <motion.div
        className="mt-3 space-y-[0.125rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href={"/products/1"}
            className="text-sm font-semibold text-black transition-colors hover:text-normal_grey"
          >
            {product.name}
          </Link>
          <motion.button
            className="wishlist-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-5 text-gray-600 transition-colors hover:text-red-500" />
          </motion.button>
        </div>
        <p className="text-lg font-bold max-md:text-base">
          ${formatNumberWithCommas(product.price)}
        </p>
        <p className="text-xs font-semibold text-primary">
          Buy one, get one free
        </p>
      </motion.div>
    </motion.div>
  );
};

// Export the component as dynamic
export default dynamic(() => Promise.resolve(Product), {
  ssr: false,
});
