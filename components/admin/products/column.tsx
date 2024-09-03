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

type Product = {
  id: string;
  name: string;
  price: number;
  size: string;
  colors: string[];
  stock: number;
  category: string;
  date: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
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
    accessorKey: "size",
    header: () => <div className="text-left">Size</div>,
    cell: ({ row }) => {
      const size = row.original.size;
      return <div className="text-left">{size}</div>;
    },
  },
  {
    accessorKey: "colors",
    header: () => <div className="text-left">Colors</div>,
    cell: ({ row }) => {
      const colors = row.original.colors;
      return <div className="text-left">{colors}</div>;
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
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      const category = row.original.category;
      return <div className="text-left">{category}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      const date = row.original.date;
      return <div className="text-left">{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
