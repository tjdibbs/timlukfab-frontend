import { columns } from "@/components/admin/sub-categories/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getSubCategories } from "@/lib/actions/sub-categories";

const Table = async () => {
  const {
    result: { count, subcategories },
    success,
  } = await getSubCategories();

  if (!success) {
    return <ErrorMessage />;
  }

  const sorted = subcategories.sort((a, b) => b.id - a.id);

  return (
    <div>
      <DataTable columns={columns} data={sorted} searchKey="name" />
    </div>
  );
};
export default Table;
