"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { format } from "date-fns";
import useMessage from "@/hooks/useMessage";
import { FileController } from "@/types/files";
import Image from "next/image";
import { deleteFile } from "@/lib/actions/files";

export const columns: ColumnDef<FileController.File>[] = [
  {
    accessorKey: "S/N",
    header: () => <div className="text-left">S/N</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "Image",
    header: () => <div className="text-left">Image</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="h-10 w-10">
          <Image
            src={rowData.path}
            alt={rowData.originalName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "originalName",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div>{rowData.originalName}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Type</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div>{rowData.mimeType}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div>{format(rowData.createdAt, "MMMM do, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      const { alertMessage } = useMessage();

      const handleDelete = async () => {
        const res = await deleteFile(String(rowData.id));
        if (res.success) {
          alertMessage(res.message, "success");
        } else {
          alertMessage(res.message, "error");
        }
      };

      return (
        <Fragment>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];
