import { columns } from "@/components/admin/colors/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getColors } from "@/lib/actions/colors";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const {
    result: { count, colors },
    success,
  } = await getColors();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedColors = colors.sort((a, b) => a.id - b.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Colors({count})</h3>
            <p className="text-sm text-gray-500">Manage your colors</p>
          </div>
          <Button>
            <Link
              href="/admin/colors/create"
              className="flex items-center gap-2"
            >
              <PlusCircleIcon className="h-4 w-4" /> Add Color
            </Link>
          </Button>
        </div>
        <div>
          <DataTable columns={columns} data={sortedColors} />
        </div>
      </div>
    </section>
  );
}
