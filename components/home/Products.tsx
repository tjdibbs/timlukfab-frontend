"use client";

import Product from "@/components/product";
import { Divider } from "antd";
import { Button } from "../ui/button";
import { ProductController } from "@/types/products";

type Props = {
  products: ProductController.Product[];
  hasMore: boolean;
};

const Products = ({ products, hasMore }: Props) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="wrapper">
        <Divider>
          <h2 className="text-3xl font-bold text-gray-800 max-md:text-2xl">
            SHOP THE LATEST
          </h2>
        </Divider>

        <div className="mt-8 grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-2">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        {!!hasMore && (
          <div className="mt-12 flex items-center justify-center">
            <Button className="w-full max-w-xs rounded-full">LOAD MORE</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
