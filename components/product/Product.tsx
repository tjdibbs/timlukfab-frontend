"use client";

import { Product as PType } from "@/data";
import { formatNumberWithCommas } from "@/utils/functions";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Heart, X } from "react-feather";
import CartAction from "./CartAction";
import addToCartIcon from "@/assets/icons/add-to-cart-icon.svg";
import { createPortal } from "react-dom";
import MobileCartAction from "./MobileCartAction";

type Props = {
  product: PType;
  index: number;
};

const Product = ({ product, index }: Props) => {
  const [showCartAction, setShowCartAction] = useState(false);
  const [showCartActionButton, setShowCartActionButton] = useState(false);
  const [openMobileCartAction, setOpenMobileCartAction] = useState(false);

  const showCartButton = () => setShowCartActionButton(true);
  const hideCartButton = () => setShowCartActionButton(false);
  const displayCartAction = () => {
    setShowCartAction(true);
    setShowCartActionButton(false);
  };
  const displayMobileCartAction = () => setOpenMobileCartAction(true);
  const hideCartAction = useCallback(() => setShowCartAction(false), []);
  const hideMobileCartAction = useCallback(
    () => setOpenMobileCartAction(false),
    [],
  );

  return (
    <div className="relative mx-auto">
      {openMobileCartAction &&
        createPortal(
          <MobileCartAction
            product={product}
            closeFn={hideMobileCartAction}
            isOpen={openMobileCartAction}
          />,
          document.body,
        )}
      <div
        className="product-link relative block h-96 cursor-pointer overflow-hidden rounded-sm max-md:h-72"
        onMouseEnter={showCartButton}
        onMouseLeave={hideCartButton}
      >
        <Image
          src={product.image}
          height={260}
          width={260}
          alt="product"
          className="h-full w-full max-w-full object-cover transition-transform duration-700 ease-linear hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 flex w-full items-center justify-end p-2 md:hidden">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-[#d9d9d9]"
            onClick={displayMobileCartAction}
          >
            <Image
              src={addToCartIcon}
              alt="add to cart"
              height={20}
              width={20}
              className="max-w-5"
            />
          </button>
        </div>
        {showCartActionButton && (
          <div className="absolute bottom-[5%] left-0 flex w-full items-center justify-center max-md:hidden">
            <button
              className="w-44 rounded-2xl bg-black py-4 text-xs font-semibold text-white"
              onClick={displayCartAction}
            >
              Quick Add
            </button>
          </div>
        )}
        {showCartAction && (
          <CartAction closeFn={hideCartAction} product={product} />
        )}
      </div>
      <div className="mt-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold">{product.name}</p>
          <button className="wishlist-btn">
            <Heart className="w-4" />
          </button>
        </div>
        <p className="text-xl font-bold max-md:text-base">
          ${formatNumberWithCommas(product.price)}
        </p>
        <p className="text-xs font-semibold text-primary">
          Buy one, get one free
        </p>
      </div>
    </div>
  );
};
export default Product;
