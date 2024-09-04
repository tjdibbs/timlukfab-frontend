import { columns } from "@/components/admin/sizes/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "@/components/admin/ui/error-message";
import { getSizes } from "@/lib/actions/sizes";

export default async function Page() {
  const {
    result: { count, sizes },
    success,
  } = await getSizes();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedSizes = sizes.sort((a, b) => b.id - a.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Sizes({count})</h3>
            <p className="text-sm text-gray-500">Manage your sizes</p>
          </div>
          <Button>
            <Link
              href="/admin/sizes/create"
              className="flex items-center gap-2"
            >
              <PlusCircleIcon className="h-4 w-4" /> Add Size
            </Link>
          </Button>
        </div>
        <div>
          <DataTable columns={columns} data={sortedSizes} />
        </div>
      </div>
    </section>
  );
}
