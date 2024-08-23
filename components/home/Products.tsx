import Product from "@/components/product/Product";
import { products } from "@/data";
import { Divider } from "antd";

const Products = () => {
  return (
    <div>
      <div className="wrapper my-8">
        <Divider>
          <span className="text-2xl font-semibold max-md:text-lg">
            SHOP THE LATEST
          </span>
        </Divider>
        <div className="mb-8 mt-4 flex items-center justify-center gap-4">
          <button className="rounded-2xl border border-[#d9d9d9] p-2 font-semibold transition-all duration-150 ease-linear hover:border-black max-md:p-1 max-md:text-xs">
            New in
          </button>
          <button className="rounded-2xl border border-[#d9d9d9] p-2 font-semibold transition-all duration-150 ease-linear hover:border-black max-md:p-1 max-md:text-xs">
            Sale
          </button>
          <button className="rounded-2xl border border-[#d9d9d9] p-2 font-semibold transition-all duration-150 ease-linear hover:border-black max-md:p-1 max-md:text-xs">
            Dresses
          </button>
          <button className="rounded-2xl border border-[#d9d9d9] p-2 font-semibold transition-all duration-150 ease-linear hover:border-black max-md:p-1 max-md:text-xs">
            Jeans
          </button>
          <button className="rounded-2xl border border-[#d9d9d9] p-2 font-semibold transition-all duration-150 ease-linear hover:border-black max-md:p-1 max-md:text-xs">
            Sets
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 max-lg:grid-cols-3 max-md:grid-cols-2">
          {products.map((product, index) => (
            <Product key={product.id} product={product} index={index} />
          ))}
        </div>
        <div className="my-8 flex items-center justify-center">
          <button className="w-48 rounded-xl bg-black py-3 text-xs font-semibold text-white">
            LOAD MORE
          </button>
        </div>
      </div>
    </div>
  );
};
export default Products;
