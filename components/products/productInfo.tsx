"use client";

import BreadCrumbComponent from "../ui/breadcrumb-component";
import clsx from "clsx";
import React, { Fragment, memo, useCallback, useMemo, useState } from "react";
import useMessage from "@/hooks/useMessage";
import { BreadCrumbLink } from "@/lib/types";
import { Button } from "../ui/button";
import { CartController } from "@/types/cart";
import { formatNumberWithCommas } from "@/utils/functions";
import { HeartOutlined } from "@ant-design/icons";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { ProductController } from "@/types/products";
import { TailwindSpinner } from "../ui/spinner";
import { useAddToCartMutation } from "@/lib/redux/services/cart";
import {
  useAddToWishesMutation,
  useGetWishesQuery,
  useRemoveFromWishesMutation,
} from "@/lib/redux/services/wishes";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

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

const ProductSizes = memo(
  ({
    sizes,
    handleChange,
    productSizeId,
  }: {
    sizes: ProductController.Size[];
    productSizeId: number | null;
    handleChange: (sizeId: number) => void;
  }) => {
    const productSizes = useMemo(() => {
      return sizes.filter(size => size.ProductSize.stock > 0);
    }, [sizes]);

    const handleSizeChange = (sizeId: number) => {
      handleChange(sizeId);
    };

    return (
      <Fragment>
        <h6 className="my-4">Select size</h6>
        <div className="grid grid-cols-4 gap-3">
          {productSizes.map(size => (
            <Button
              variant={size.id === productSizeId ? "default" : "outline"}
              key={size.id}
              onClick={() => handleSizeChange(size.id)}
            >
              {size.name}
            </Button>
          ))}
        </div>
      </Fragment>
    );
  }
);

const ProductColors = memo(
  ({
    colors,
    handleColor,
    productColorId,
  }: {
    colors: ProductController.Color[];
    productColorId: number | null;
    handleColor: (colorId: number) => void;
  }) => {
    const productColors = useMemo(() => {
      return colors.filter(color => color.ProductColor.stock > 0);
    }, [colors]);

    const handleChange = (colorId: number) => {
      handleColor(colorId);
    };

    return (
      <div>
        <h6 className="my-4">Select color</h6>
        <div className="mt-4 flex items-center gap-2">
          {productColors.map(color => (
            <button
              key={color.id}
              onClick={() => handleChange(color.id)}
              className={clsx(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 hover:border-black",
                {
                  "border-black": color.id === productColorId,
                }
              )}
            >
              <div
                style={{ backgroundColor: color.hexCode }}
                className="h-[90%] w-[90%] rounded-full"
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
  const [productColorId, setProductColorId] = useState<number | null>(null);
  const [productSizeId, setProductSizeId] = useState<number | null>(null);
  const user = useAppSelector(state => state.user);

  const router = useRouter();

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [addToWishes, { isLoading: isFetching }] = useAddToWishesMutation();
  const [removeFromWishes, { isLoading: isPending }] =
    useRemoveFromWishesMutation();

  const { data } = useGetWishesQuery(undefined);

  const isInWishlist: boolean = useMemo(() => {
    return (
      data?.result.wishes.some(item => item.productId === product.id) || false
    );
  }, [data]);

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSizeChange = useCallback((sizeId: number) => {
    setProductSizeId(sizeId);
  }, []);

  const handleColorChange = useCallback((colorId: number) => {
    setProductColorId(colorId);
  }, []);

  const { alertMessage } = useMessage();

  const handleAddToWishes = async () => {
    try {
      await addToWishes({
        productId: product.id,
        description: product.description || "description",
      }).unwrap();
      alertMessage("Added to wishlist", "success");
    } catch (error) {
      console.log(error);
      alertMessage("Something went wrong", "error");
    }
  };

  const handleDeleteWishist = async () => {
    if (!data) return;
    try {
      const wishToDelete = data.result.wishes.find(
        wish => wish.productId === product.id
      );
      if (!wishToDelete) {
        throw new Error("Wishlist not found");
      }
      await removeFromWishes({
        productId: product.id,
        wishesId: wishToDelete.id,
      }).unwrap();
      alertMessage("Removed from wishlist", "success");
    } catch (error) {
      console.log(error);
      alertMessage("Something went wrong", "error");
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!productColorId || !productSizeId) {
      alertMessage("Please select size and color", "error");
      return;
    }

    const payload: CartController.AddItem = {
      productId: product.id,
      quantity,
      productSizeId,
      productColorId,
    };

    try {
      const response = await addToCart(payload).unwrap();
      if (!response) {
        throw new Error("Failed to add item to cart");
      }
      alertMessage("Item added to cart", "success");
      setQuantity(1);
      setProductColorId(null);
      setProductSizeId(null);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alertMessage("Failed to add item to cart", "error");
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

        <p className="mt-2 text-sm text-gray-600">
          {!!product.stock ? (
            `Stock: ${product.stock} available`
          ) : (
            <span className="text-red-500">out of stock</span>
          )}
        </p>

        <div>
          <ProductSizes
            handleChange={handleSizeChange}
            productSizeId={productSizeId}
            sizes={product.sizes}
          />

          <ProductColors
            productColorId={productColorId}
            handleColor={handleColorChange}
            colors={product.colors}
          />

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
            <Button
              disabled={isLoading}
              className="flex-1"
              onClick={handleAddToCart}
            >
              {isLoading ? (
                <TailwindSpinner className="h-5 w-5" />
              ) : (
                "Add to cart"
              )}
            </Button>
            {!!user && (
              <Button
                variant={"outline"}
                size={"icon"}
                disabled={isFetching || isPending}
                onClick={isInWishlist ? handleDeleteWishist : handleAddToWishes}
                className="flex items-center justify-center rounded-full border border-[#eee] text-lg hover:bg-[#eee]"
              >
                {isFetching || isPending ? (
                  <TailwindSpinner className="h-5 w-5" />
                ) : (
                  <Heart fill={isInWishlist ? "#FF0000" : "none"} />
                )}
              </Button>
            )}
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
