import { columns } from "@/components/admin/sizes/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getSizes } from "@/lib/actions/sizes";

const Table = async () => {
  const {
    result: { count, sizes },
    success,
  } = await getSizes();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedSizes = sizes.sort((a, b) => b.id - a.id);

  return (
    <div>
      <DataTable columns={columns} data={sortedSizes} searchKey="name" />
    </div>
  );
};
export default Table;
