import Product from "@/components/product/Product";
import { products } from "@/data";
import { Divider } from "antd";

const Products = () => {
  if (!products || products.length === 0) {
    return <div className="py-8 text-center">No products available</div>;
  }

  const categories = ["New in", "Sale", "Dresses", "Jeans", "Sets"];

  return (
    <section className="bg-gray-50 py-12">
      <div className="wrapper">
        <Divider>
          <h2 className="text-3xl font-bold text-gray-800 max-md:text-2xl">
            SHOP THE LATEST
          </h2>
        </Divider>

        <div className="mb-8 mt-6 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product, index) => (
            <Product key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <button className="w-full max-w-xs rounded-full bg-black py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
            LOAD MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
