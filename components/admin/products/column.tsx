"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductController } from "@/types/products";
import { format } from "date-fns";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/products";
import useMessage from "@/hooks/useMessage";
import Image from "next/image";

export const columns: ColumnDef<ProductController.Product>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => {
      const description = row.original.description;
      return <div className="text-left">{description}</div>;
    },
  },
  {
    accessorKey: "medias",
    header: () => <div className="text-left">Media</div>,
    cell: ({ row }) => {
      const media = row.original.medias[0];
      return (
        <div className="flex w-12 items-center justify-center">
          <Image
            src={media.path}
            alt="product image"
            width={100}
            height={100}
            className="aspect-square w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "stock",
    header: () => <div className="text-left">Stock</div>,
    cell: ({ row }) => {
      const stock = row.original.stock;
      return <div className="text-left">{stock}</div>;
    },
  },
  {
    accessorKey: "colors",
    header: () => <div className="text-left">Colors</div>,
    cell: ({ row }) => {
      const colors = row.original.colors;

      const productColors = colors.map(color => color.hexCode);

      return (
        <div className="flex items-center gap-1">
          {productColors.map(color => (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className="h-3 w-3 rounded-full"
            ></div>
          ))}
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
        const res = await deleteProduct(String(rowData.id));
        if (res.success) {
          alertMessage(res.message, "success");
        } else {
          alertMessage(res.message, "error");
        }
      };

      return (
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
              <Link href={`/admin/products/${rowData.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/products/${rowData.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
