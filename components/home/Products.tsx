import Link from "next/link";
import Product from "@/components/product";
import { Button } from "../ui/button";
import { Divider } from "antd";
import { ProductController } from "@/types/products";

type Props = {
  products: ProductController.Product[];
};

const Products = ({ products }: Props) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="wrapper">
        <Divider>
          <h2 className="text-3xl font-bold text-gray-800 max-md:text-2xl">
            SHOP THE LATEST
          </h2>
        </Divider>

        <div className="mt-8 grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-2">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Button className="w-40 text-sm" size={"default"}>
            <Link href="/shop" className="text-white">
              SEE MORE
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
