import ErrorMessage from "@/components/admin/ui/error-message";
import { getSizes } from "@/lib/actions/sizes";
import ClientTable from "./client";

const Table = async () => {
  const {
    result: { count, sizes, hasMore },
    success,
  } = await getSizes();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedSizes = sizes.sort((a, b) => b.id - a.id);

  return (
    <div>
      <ClientTable data={sortedSizes} hasMore={hasMore} />
    </div>
  );
};
export default Table;
