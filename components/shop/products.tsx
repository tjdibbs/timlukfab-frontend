import Product from "@/components/product/Product";
import { products } from "@/data";

const Products = () => {
  return (
    <div className="col-span-9 grid grid-cols-2 gap-2 md:grid-cols-3">
      {products.map((product, index) => (
        <Product key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
export default Products;
