"use client";

import { SubCategoryController } from "@/types/sub-categories";
import { columns } from "@/components/admin/sub-categories/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: SubCategoryController.Category[];
  hasMore: boolean;
};

const getSubCategories = async (
  pageNumber: number
): Promise<SubCategoryController.Get> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-categories?pageNumber=${pageNumber}`,
    {
      next: { tags: ["SubCategories"] },
    }
  );

  return res.json();
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [subCategories, setSubCategories] =
    useState<SubCategoryController.Category[]>(data);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { subcategories, hasMore },
      } = await getSubCategories(pageNumber);

      setItHasmore(hasMore);
      setSubCategories([...subCategories, ...subcategories]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return <DataTable columns={columns} data={subCategories} searchKey="name" />;
};
export default ClientTable;
