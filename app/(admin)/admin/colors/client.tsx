"use client";

import { ColorsController } from "@/types/colors";
import { columns } from "@/components/admin/colors/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: ColorsController.Color[];
  hasMore: boolean;
};

const getColors = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/colors?pageNumber=${pageNumber}`,
    {
      next: { tags: ["Colors"] },
    }
  );
  const data = await res.json();
  return data as ColorsController.Get;
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [productColors, setProductColors] =
    useState<ColorsController.Color[]>(data);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { colors, hasMore },
      } = await getColors(pageNumber);

      setItHasmore(hasMore);
      setProductColors([...productColors, ...colors]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return <DataTable columns={columns} data={productColors} searchKey="name" />;
};
export default ClientTable;
