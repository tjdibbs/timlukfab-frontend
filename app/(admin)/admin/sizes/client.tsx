"use client";

import { SizesController } from "@/types/sizes";
import { columns } from "@/components/admin/sizes/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: SizesController.Size[];
  hasMore: boolean;
};

const getSizes = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes?pageNumber=${pageNumber}`,
    {
      next: { tags: ["Sizes"] },
    }
  );
  const data = await res.json();
  return data as SizesController.Get;
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [productSizes, setProductSizes] =
    useState<SizesController.Size[]>(data);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { sizes, hasMore },
      } = await getSizes(pageNumber);

      setItHasmore(hasMore);
      setProductSizes([...productSizes, ...sizes]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return <DataTable columns={columns} data={productSizes} searchKey="name" />;
};
export default ClientTable;
