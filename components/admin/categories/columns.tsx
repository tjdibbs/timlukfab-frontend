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
import { CategoryController } from "@/types/categories";
import Link from "next/link";
import Image from "next/image";
import { deleteCategory } from "@/lib/actions/categories";

export const columns: ColumnDef<CategoryController.Category>[] = [
  {
    accessorKey: "S/N",
    header: () => <div className="text-left">S/N</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="flex items-center gap-2">
          {rowData.description || "Nil"}
        </div>
      );
    },
  },
  {
    accessorKey: "imageId",
    header: () => <div className="text-left">Image</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="h-10 w-10 rounded">
          <Image
            src={rowData.image.path}
            alt={rowData.image.originalName}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "bannerId",
    header: () => <div className="text-left">Banner</div>,
    cell: ({ row }) => {
      const rowData = row.original;

      if (!rowData.bannerId) {
        return <div>No banner</div>;
      }

      return (
        <div className="h-10 w-10 rounded">
          <Image
            src={rowData.banner!.path}
            alt={rowData.banner!.originalName}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      );
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
        const res = await deleteCategory(String(rowData.id));
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
              <DropdownMenuItem>
                <Link href={`/admin/categories/edit/${rowData.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];
