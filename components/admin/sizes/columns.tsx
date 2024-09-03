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
import { SizesController } from "@/types/sizes";
import { Fragment, useState } from "react";
import { format } from "date-fns";
import EditForm from "./edit";
import useMessage from "@/hooks/useMessage";
import { deleteSize } from "@/lib/actions/sizes";

export const columns: ColumnDef<SizesController.Size>[] = [
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
        const res = await deleteSize(String(rowData.id));
        if (res.success) {
          alertMessage(res.message, "success");
        } else {
          alertMessage(res.message, "error");
        }
      };

      return (
        <Fragment>
          <EditForm open={open} setOpen={setOpen} size={rowData} />
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
