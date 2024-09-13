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

type Props = {
  data: ProductController.Product[];
  hasMore: boolean;
};

const getProducts = async (id: string): Promise<ProductController.Get> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/products`,
    {
      next: {
        revalidate: 100,
      },
    }
  );

  return res.json();
};

const Products = ({ data, hasMore }: Props) => {
  return (
    <Fragment>
      <div
        style={{ rowGap: "0.75rem" }}
        className="col-span-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
      >
        {data.map((product, index) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
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
