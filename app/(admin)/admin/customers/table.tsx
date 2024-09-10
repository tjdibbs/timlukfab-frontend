import ErrorMessage from "@/components/admin/ui/error-message";
import { getUsers } from "@/lib/actions/users";
import ClientTable from "./client";

const Table = async () => {
  const {
    users: { count, users, hasMore },
    success,
  } = await getUsers();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedUsers = users.sort((a, b) => b.id - a.id);
  return (
    <div>
      <ClientTable data={sortedUsers} hasMore={hasMore} />
    </div>
  );
};
export default Table;
