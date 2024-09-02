"use client";

import { products } from "@/data";
import Product from "../product/Product";
import { Fragment } from "react";
import { Separator } from "../ui/separator";

const RelatedProducts = () => {
  return (
    <Fragment>
      <Separator className="mt-12" />
      <h3 className="mb-8 mt-4 text-xl font-semibold tracking-wide text-dark_grey max-md:text-lg">
        RELATED PRODUCTS
      </h3>
      <div className="col-span-9 grid w-full grid-cols-2 gap-2 md:grid-cols-4">
        {products.slice(0, 4).map((product, index) => (
          <Product key={product.id} product={product} index={index} />
        ))}
      </div>
    </Fragment>
  );
};
export default RelatedProducts;
