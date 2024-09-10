import ErrorMessage from "@/components/admin/ui/error-message";
import { getProducts } from "@/lib/actions/products";
import ClientTable from "./client";

const Table = async () => {
  const {
    result: { products, count, hasMore },
    success,
  } = await getProducts();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedProducts = products.sort((a, b) => b.id - a.id);
  return (
    <div>
      <ClientTable data={sortedProducts} hasMore={hasMore} />
    </div>
  );
};
export default Table;
