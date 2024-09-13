"use client";

import { useGetWishesQuery } from "@/lib/redux/services/wishes";
import { ProductController } from "@/types/products";
import Product from "../product";

type Props = {
  className: string;
  products: ProductController.Product[];
};

const ProductsComponent = ({ className, products }: Props) => {
  const { data } = useGetWishesQuery(undefined);

  return (
    <div className={className}>
      {products.map(product => (
        <Product key={product.id} product={product} wishes={data?.result} />
      ))}
    </div>
  );
};
export default ProductsComponent;
