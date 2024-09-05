import { columns } from "@/components/admin/colors/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getColors } from "@/lib/actions/colors";

const Table = async () => {
  const {
    result: { count, colors },
    success,
  } = await getColors();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedColors = colors.sort((a, b) => b.id - a.id);

  return (
    <div>
      <DataTable columns={columns} data={sortedColors} searchKey="name" />
    </div>
  );
};
export default Table;
