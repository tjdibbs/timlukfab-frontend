"use client";

import { UserController } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<UserController.User>[] = [
  {
    accessorKey: "S/N",
    header: () => <div className="text-left">S/N</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-left">Full Name</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div className="text-left">{rowData.fullName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div className="text-left">{rowData.email}</div>;
    },
  },
  {
    accessorKey: "country",
    header: () => <div className="text-left">Country</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <div className="text-left">{rowData.country}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="text-left">
          {format(rowData.createdAt, "MMMM do, yyyy")}
        </div>
      );
    },
  },
];
