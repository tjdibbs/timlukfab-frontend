"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { Fragment, memo, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { HeartOutlined } from "@ant-design/icons";
import { BreadCrumbLink } from "@/lib/types";
import { ProductController } from "@/types/products";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import { formatNumberWithCommas } from "@/utils/functions";

type Props = {
  product: ProductController.Product;
};

const Breadcrumb = ({ name }: { name: string }) => {
  const breadcrumbLinks: BreadCrumbLink[] = [
    {
      id: 1,
      name: "Home",
      href: "/",
      isPage: false,
    },
    {
      id: 2,
      name: "Shop",
      href: "/shop",
      isPage: false,
    },
    {
      id: 3,
      name: name,
      href: `/products/${name}`,
      isPage: true,
    },
  ];

  return <BreadCrumbComponent links={breadcrumbLinks} />;
};

const ProductSizes = memo(({ sizes }: { sizes: ProductController.Size[] }) => {
  return (
    <Fragment>
      <h6 className="my-4">Select size</h6>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map(size => (
          <Button variant={"outline"} key={size.id}>
            {size.name}
          </Button>
        ))}
      </div>
    </Fragment>
  );
});

const ProductColors = memo(
  ({ colors }: { colors: ProductController.Color[] }) => {
    return (
      <div>
        <h6 className="my-4">Select color</h6>
        <div className="mt-4 flex items-center gap-2">
          {colors.map(color => (
            <button
              key={color.id}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-transparent hover:border-black"
            >
              <div
                style={{ backgroundColor: color.hexCode }}
                className="h-full w-full rounded-full hover:scale-90"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

const ProductInfo = memo(({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const productHasSizes = useMemo(
    () => product.sizes.length > 0,
    [product.sizes]
  );

  const productHasColors = useMemo(
    () => product.colors.length > 0,
    [product.colors]
  );

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
          <Breadcrumb name={product.name} />
        </div>

        <h2 className="mb-6 mt-4 text-4xl tracking-wide text-black max-md:text-2xl">
          {product.name}
        </h2>

        <p className="flex items-center gap-2 text-xl font-semibold">
          ${formatNumberWithCommas(Number(product.price))}
        </p>

        <div>
          {productHasSizes && <ProductSizes sizes={product.sizes} />}
          {productHasColors && <ProductColors colors={product.colors} />}
          <div>
            <h6 className="my-4">Quantity</h6>
            <div className="mt-4 flex max-w-[150px] items-center">
              <Button className="flex-1" size={"icon"} onClick={handleDecrease}>
                <MinusIcon />
              </Button>
              <div className="flex-[2] text-center">{quantity}</div>
              <Button className="flex-1" size={"icon"} onClick={handleIncrease}>
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Button className="flex-1">Add to cart</Button>
            <Button
              variant={"outline"}
              size={"icon"}
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

ProductSizes.displayName = "ProductSizes";
ProductColors.displayName = "ProductColors";
ProductInfo.displayName = "ProductInfo";
export default ProductInfo;
