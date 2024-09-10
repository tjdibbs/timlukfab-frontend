"use server";

import { UserController } from "@/types/users";
import { columns } from "@/components/admin/customers/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type Props = {
  data: UserController.User[];
  hasMore: boolean;
};

const getUsers = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?pageNumber=${pageNumber}`,
    {
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  return data as UserController.Get;
};

const ClientTable = ({ data, hasMore }: Props) => {
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [allUsers, setAllUsers] = useState<UserController.User[]>(data);

  useEffect(() => {
    let pageNumber = 2;

    const fetchOtherPages = async () => {
      const {
        users: { hasMore, users },
      } = await getUsers(pageNumber);

      setItHasmore(hasMore);
      setAllUsers([...allUsers, ...users]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

  return <DataTable columns={columns} data={allUsers} searchKey="fullName" />;
};
export default ClientTable;
