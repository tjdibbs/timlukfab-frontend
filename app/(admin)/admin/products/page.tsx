import { DataTable } from "@/components/ui/data-table";

import { columns } from "@/components/admin/products/column";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import ErrorMessage from "@/components/admin/ui/error-message";

export default async function Page() {
  const {
    result: { products, count },
    success,
  } = await getProducts();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedProducts = products.sort((a, b) => b.id - a.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Products({count})</h3>
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
          <DataTable columns={columns} data={sortedProducts} />
        </div>
      </div>
    </section>
  );
}
