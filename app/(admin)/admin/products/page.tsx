import { DataTable } from "@/components/ui/data-table";
import { products } from "./data";
import { columns } from "@/components/admin/products/column";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Products</h3>
            <p className="text-sm text-gray-500">Manage your products</p>
          </div>
          <Button>
            <Link
              href="/admin/products/create"
              className="flex items-center gap-2"
            >
              <PlusCircleIcon className="h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
        <div>
          <DataTable columns={columns} data={products} />
        </div>
      </div>
    </section>
  );
}
