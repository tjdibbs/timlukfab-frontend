"use client";

import Product from "@/components/product";
import { ProductController } from "@/types/products";
import { Fragment, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ProductsComponent from "../ui/products";
import { products } from "../../data/index";

type Props = {
  data: ProductController.Product[];
  hasMore: boolean;
};

const getProducts = async (): Promise<ProductController.Get> => {
  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    next: {
      revalidate: 100,
    },
  });

  return res.json();
};

const Products = ({ data, hasMore }: Props) => {
  return (
    <Fragment>
      <ProductsComponent
        className="col-span-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        products={data}
      />
      {/* <div>
        <Pagination>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </Pagination>
      </div> */}
    </Fragment>
  );
};

export default Products;
