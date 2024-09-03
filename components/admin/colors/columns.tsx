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
import { ColorsController } from "@/types/colors";
import EditForm from "./edit";
import { deleteColor } from "@/lib/actions/colors";

export const columns: ColumnDef<ColorsController.Color>[] = [
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
          {rowData.description}
          <div
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: rowData.hexCode }}
          ></div>
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
      const [open, setOpen] = useState(false);

      const { alertMessage } = useMessage();

      const handleOpen = () => setOpen(true);

      const handleDelete = async () => {
        const res = await deleteColor(String(rowData.id));
        if (res.success) {
          alertMessage(res.message, "success");
        } else {
          alertMessage(res.message, "error");
        }
      };

      return (
        <Fragment>
          <EditForm open={open} setOpen={setOpen} color={rowData} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpen}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];
