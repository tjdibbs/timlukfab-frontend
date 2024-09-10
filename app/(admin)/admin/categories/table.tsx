import ErrorMessage from "@/components/admin/ui/error-message";
import { getCategories } from "@/lib/actions/categories";
import ClientTable from "./client";

const Table = async () => {
  const {
    result: { count, categories, hasMore },
    success,
  } = await getCategories();

  if (!success) {
    return <ErrorMessage />;
  }

  const sorted = categories.sort((a, b) => b.id - a.id);

  return (
    <div>
      <ClientTable data={sorted} hasMore={hasMore} />
    </div>
  );
};
export default Table;
