"use client";

import { useGetCartQuery } from "@/lib/redux/services/cart";
import { CartController } from "@/types/cart";
import {
  calculateCartItemTotal,
  calculateCartTotal,
  formatNumberWithCommas,
} from "@/utils/functions";
import Image from "next/image";
import { memo, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const OrderSummary = () => {
  const { data, isLoading } = useGetCartQuery({});

  if (isLoading) {
    return <OrderSummarySkeleton />;
  }

  if (!data) {
    return (
      <div className="col-span-5 lg:px-4 lg:py-8">
        <h4 className="text-xl font-semibold uppercase">Order Summary</h4>
        <p className="mt-6 text-sm text-red-500">An error occured</p>
      </div>
    );
  }

  return (
    <div className="col-span-5 max-lg:pb-8 lg:px-4 lg:py-8">
      <h4 className="text-xl font-semibold uppercase">Order Summary</h4>
      <div className="mt-6 space-y-4">
        {data.cartItems.map(cartItem => (
          <OrderItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Summary cartitems={data.cartItems} />
    </div>
  );
};

const Summary = ({ cartitems }: { cartitems: CartController.CartItem[] }) => {
  const cartLength = useMemo(() => cartitems.length, [cartitems]);
  const cartTotal = useMemo(() => calculateCartTotal(cartitems), [cartitems]);

  return (
    <div className="mt-6">
      <ul className="w-full space-y-4">
        <li className="flex items-center justify-between text-sm font-semibold">
          <span>Subtotal ({cartLength} items)</span>
          <span>${formatNumberWithCommas(cartTotal)}</span>
        </li>
        <li className="flex items-center justify-between text-sm font-semibold">
          <span>Shipping</span>
          <span>FREE</span>
        </li>
        <li className="flex items-center justify-between text-base font-semibold">
          <span>TOTAL</span>
          <span>${formatNumberWithCommas(cartTotal)}</span>
        </li>
      </ul>
    </div>
  );
};

const OrderItem = memo(
  ({ cartItem }: { cartItem: CartController.CartItem }) => {
    const itemTotal = useMemo(
      () => calculateCartItemTotal(cartItem),
      [cartItem]
    );
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-12">
          <Image
            src={cartItem.product.medias[0].path}
            alt={cartItem.product.name}
            height={100}
            width={100}
            className="aspect-[5/6] w-full rounded object-cover"
          />
          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
            {cartItem.quantity}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col gap-1">
            <Link href={`/products/${cartItem.product.id}`} className="text-sm">
              {cartItem.product.name}
            </Link>
            <div className="flex items-center gap-2 text-xs text-normal_grey">
              <span>{cartItem.productSize.size.name}</span>
              <div
                style={{ backgroundColor: cartItem.productColor.color.hexCode }}
                className="h-3 w-3 rounded-full shadow"
              ></div>
            </div>
          </div>
          <span>${formatNumberWithCommas(itemTotal)}</span>
        </div>
      </div>
    );
  }
);

const OrderItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 py-2">
      <Skeleton className="h-16 w-16" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

const OrderSummarySkeleton = () => {
  return (
    <div className="col-span-5 lg:px-4 lg:py-8">
      <h4 className="text-xl font-semibold uppercase">Order Summary</h4>
      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <OrderItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

OrderItem.displayName = "OrderItem";
export default OrderSummary;
