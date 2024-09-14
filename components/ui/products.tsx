"use client";

import { useGetWishesQuery } from "@/lib/redux/services/wishes";
import { ProductController } from "@/types/products";
import Product from "../product";
import { useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

type Props = {
  className: string;
  products: ProductController.Product[];
};

const ProductsComponent = ({ className, products }: Props) => {
  const token = useAppSelector(state => state.auth.token);
  const { data, refetch } = useGetWishesQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  return (
    <div className={className}>
      {products.map(product => (
        <Product key={product.id} product={product} wishes={data?.result} />
      ))}
    </div>
  );
};
export default ProductsComponent;
