"use client";

import { MinusIcon, PlusIcon, SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { memo, useState } from "react";
import { Button } from "../ui/button";
import { HeartOutlined } from "@ant-design/icons";

const sizes = ["XS", "S", "M", "L", "XL", "2X", "3X"];

const ProductInfo = memo(() => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
    // if (quantity < stock) {
    // }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <section className="col-span-5">
      <div className="">
        <div className="max-lg:hidden">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-lg uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
                >
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/shop"
                  className="text-lg uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
                >
                  SHOP
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h2 className="mb-6 mt-4 text-4xl tracking-wide text-black max-md:text-2xl">
          Black dress with flower neck
        </h2>

        <p className="flex items-center gap-2 text-xl font-semibold">$200</p>

        <div>
          <h6 className="my-4">Select size</h6>
          <div className="grid grid-cols-4 gap-3">
            {sizes.map(size => (
              <Button variant={"outline"} key={size}>
                {size}
              </Button>
            ))}
          </div>
          <div>
            <h6 className="my-4">Select color</h6>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-black">
                <div className="h-full w-full rounded-full bg-red-600 hover:scale-90" />
              </div>
              <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-black">
                <div className="h-full w-full rounded-full bg-blue-600 hover:scale-90" />
              </div>
              <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-black">
                <div className="h-full w-full rounded-full bg-green-600 hover:scale-90" />
              </div>
            </div>
          </div>
          <div>
            <h6 className="my-4">Quantity</h6>
            <div className="mt-4 flex max-w-[150px] items-center">
              <Button className="flex-1" onClick={handleDecrease}>
                <MinusIcon />
              </Button>
              <div className="flex-[2] text-center">{quantity}</div>
              <Button className="flex-1" onClick={handleIncrease}>
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Button className="flex-1">Add to cart</Button>
            <Button
              variant={"outline"}
              className="flex items-center justify-center rounded-full border border-[#eee] text-lg hover:bg-[#eee]"
            >
              <HeartOutlined />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

ProductInfo.displayName = "ProductInfo";
export default ProductInfo;
