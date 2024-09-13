"use client";

import { CategoryController } from "@/types/categories";
import { columns } from "@/components/admin/categories/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: CategoryController.Category[];
  hasMore: boolean;
};

const getCategories = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?pageNumber=${pageNumber}`,
    {
      next: { tags: ["Categories"] },
    }
  );

  const data = await res.json();
  return data as CategoryController.Get;
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [productCategories, setProductCategories] =
    useState<CategoryController.Category[]>(data);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { categories, hasMore },
      } = await getCategories(pageNumber);

      setItHasmore(hasMore);
      setProductCategories([...productCategories, ...categories]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return (
    <DataTable columns={columns} data={productCategories} searchKey="name" />
  );
};
export default ClientTable;
