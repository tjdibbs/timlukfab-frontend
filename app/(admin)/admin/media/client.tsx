"use client";

import { FileController } from "@/types/files";
import { columns } from "@/components/admin/media/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  hasMore: boolean;
  tableFiles: FileController.File[];
};

const getFiles = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/files?pageNumber=${pageNumber}`,
    {
      next: { revalidate: 300 },
    }
  );
  const data = await res.json();
  return data as FileController.Get;
};

const ClientDataTable = ({ tableFiles, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [images, setImages] = useState<FileController.File[]>(tableFiles);

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { files, hasMore },
      } = await getFiles(pageNumber);

      setItHasmore(hasMore);
      setImages([...images, ...files]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return <DataTable columns={columns} data={images} searchKey="originalName" />;
};
export default ClientDataTable;
