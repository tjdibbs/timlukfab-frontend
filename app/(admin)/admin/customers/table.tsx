import { columns } from "@/components/admin/customers/columns";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getUsers } from "@/lib/actions/users";

const Table = async () => {
  const {
    users: { count, users },
    success,
  } = await getUsers();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedUsers = users.sort((a, b) => b.id - a.id);
  return (
    <div>
      <DataTable columns={columns} data={sortedUsers} searchKey="fullName" />
    </div>
  );
};
export default Table;
