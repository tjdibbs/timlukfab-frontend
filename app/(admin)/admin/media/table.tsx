import ErrorMessage from "@/components/admin/ui/error-message";
import { getFiles } from "@/lib/actions/files";
import ClientDataTable from "./client";

const Table = async () => {
  const {
    result: { count, files, hasMore },
    success,
  } = await getFiles();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedFiles = files.sort((a, b) => b.id - a.id);
  return (
    <div>
      <ClientDataTable tableFiles={sortedFiles} hasMore={hasMore} />
    </div>
  );
};
export default Table;
