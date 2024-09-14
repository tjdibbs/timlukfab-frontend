"use client";

import { ProductController } from "@/types/products";
import { Fragment } from "react";
import ProductsComponent from "../ui/products";

type Props = {
  data: ProductController.Product[];
  hasMore: boolean;
};

const PageProducts = ({ data, hasMore }: Props) => {
  return (
    <Fragment>
      <ProductsComponent
        className="col-span-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        products={data}
      />
    </Fragment>
  );
};

export default PageProducts;
