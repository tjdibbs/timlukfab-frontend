import { products } from "@/data";
import { Divider } from "antd";
import Image from "next/image";

const BrowseCategories = () => {
  return (
    <div className="wrapper my-16">
      <Divider>
        <span className="text-2xl font-semibold max-md:text-lg">
          BROWSE OUR CATEGORIES
        </span>
      </Divider>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-8">
        {products.slice(0, 3).map(product => (
          <div
            key={product.id}
            className="relative h-96 max-md:mx-auto max-md:w-[80%] md:h-72 xl:h-80"
          >
            <Image
              src={product.image}
              alt={product.name}
              height={500}
              width={500}
              className="z-[-1] h-full w-full object-cover"
            />
            <div className="absolute -bottom-1 left-0 flex w-full items-center justify-center">
              <div className="w-[80%] bg-black py-4 text-center">
                <p className="text-lg font-semibold uppercase text-white max-md:text-sm">
                  all collections
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrowseCategories;
