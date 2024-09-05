import { columns } from "@/components/admin/products/column";
import ErrorMessage from "@/components/admin/ui/error-message";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/lib/actions/products";

const Table = async () => {
  const {
    result: { products, count },
    success,
  } = await getProducts();

  if (!success) {
    return <ErrorMessage />;
  }

  const sortedProducts = products.sort((a, b) => b.id - a.id);
  return (
    <div>
      <DataTable columns={columns} data={sortedProducts} searchKey="name" />
    </div>
  );
};
export default Table;
