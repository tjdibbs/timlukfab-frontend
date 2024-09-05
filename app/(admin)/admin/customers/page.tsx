import { DataTable } from "@/components/ui/data-table";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "@/components/admin/ui/error-message";
import { getUsers } from "@/lib/actions/users";
import { columns } from "@/components/admin/customers/columns";

export default async function Page() {
  const {
    users: { count, users },
    success,
  } = await getUsers();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedUsers = users.sort((a, b) => b.id - a.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <h3 className="mb-1 text-3xl font-extrabold">Customers({count})</h3>
          <p className="text-sm text-gray-500">Manage your customers</p>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={sortedUsers}
            searchKey="fullName"
          />
        </div>
      </div>
    </section>
  );
}
