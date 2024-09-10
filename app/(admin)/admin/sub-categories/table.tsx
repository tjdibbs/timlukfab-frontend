import ErrorMessage from "@/components/admin/ui/error-message";
import { getSubCategories } from "@/lib/actions/sub-categories";
import ClientTable from "./client";

const Table = async () => {
  const {
    result: { count, subcategories, hasMore },
    success,
  } = await getSubCategories();

  if (!success) {
    return <ErrorMessage />;
  }

  const sorted = subcategories.sort((a, b) => b.id - a.id);

  return (
    <div>
      <ClientTable data={sorted} hasMore={hasMore} />
    </div>
  );
};
export default Table;
