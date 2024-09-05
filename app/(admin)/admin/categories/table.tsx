import { columns } from "@/components/admin/categories/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getCategories } from "@/lib/actions/categories";

const Table = async () => {
  const {
    result: { count, categories },
    success,
  } = await getCategories();

  if (!success) {
    return <ErrorMessage />;
  }

  const sorted = categories.sort((a, b) => b.id - a.id);

  return (
    <div>
      <DataTable columns={columns} data={sorted} searchKey="name" />
    </div>
  );
};
export default Table;
