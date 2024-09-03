import { DataTable } from "@/components/ui/data-table";
import ErrorMessage from "@/components/admin/ui/error-message";
import UploadForm from "@/components/admin/media/form";
import { getFiles } from "@/lib/actions/files";
import { columns } from "@/components/admin/media/columns";

export default async function Page() {
  const {
    result: { count, files },
    success,
  } = await getFiles();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedFiles = files.sort((a, b) => a.id - b.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Images({count})</h3>
            <p className="text-sm text-gray-500">Manage your media</p>
          </div>
          <UploadForm />
        </div>
        <div>
          <DataTable columns={columns} data={sortedFiles} />
        </div>
      </div>
    </section>
  );
}
