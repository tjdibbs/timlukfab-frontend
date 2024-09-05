import { columns } from "@/components/admin/media/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getFiles } from "@/lib/actions/files";

const Table = async () => {
  const {
    result: { count, files },
    success,
  } = await getFiles();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedFiles = files.sort((a, b) => b.id - a.id);
  return (
    <div>
      <DataTable columns={columns} data={sortedFiles} searchKey="name" />
    </div>
  );
};
export default Table;
