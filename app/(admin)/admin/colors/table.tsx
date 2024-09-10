import ErrorMessage from "@/components/admin/ui/error-message";
import { getColors } from "@/lib/actions/colors";
import ClientTable from "./client";

const Table = async () => {
  const {
    result: { count, colors, hasMore },
    success,
  } = await getColors();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedColors = colors.sort((a, b) => b.id - a.id);

  return (
    <div>
      <ClientTable data={sortedColors} hasMore={hasMore} />
    </div>
  );
};
export default Table;
