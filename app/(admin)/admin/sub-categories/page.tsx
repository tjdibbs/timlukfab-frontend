import { columns } from "@/components/admin/sub-categories/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getSubCategories } from "@/lib/actions/sub-categories";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const {
    result: { count, subcategories },
    success,
  } = await getSubCategories();

  if (!success) {
    return <ErrorMessage />;
  }

  const sorted = subcategories.sort((a, b) => a.id - b.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">
              Sub Categories({count})
            </h3>
            <p className="text-sm text-gray-500">Manage your sub-categories</p>
          </div>
          <Button>
            <Link
              href="/admin/sub-categories/create"
              className="flex items-center gap-2"
            >
              <PlusCircleIcon className="h-4 w-4" /> Add Sub-category
            </Link>
          </Button>
        </div>
        <div>
          <DataTable columns={columns} data={sorted} />
        </div>
      </div>
    </section>
  );
}
