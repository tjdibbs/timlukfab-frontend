"use client";

import { ProductController } from "@/types/products";
import { columns } from "@/components/admin/products/column";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: ProductController.Product[];
  hasMore: boolean;
};

const getProducts = async (
  pageNumber: number
): Promise<ProductController.Get> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?pageNumber=${pageNumber}`,
    {
      next: {
        tags: ["products"],
      },
    }
  );

  return res.json();
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [allProducts, setAllProducts] =
    useState<ProductController.Product[]>(data);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { products, hasMore },
      } = await getProducts(pageNumber);

      setItHasmore(hasMore);
      setAllProducts([...allProducts, ...products]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);
  return <DataTable columns={columns} data={allProducts} searchKey="name" />;
};
export default ClientTable;
