import { products } from "@/data";
import Image from "next/image";
import { X } from "react-feather";

const MobileWishlist = () => {
  return (
    <div className="px-2">
      {products.map((product) => (
        <div key={product.id} className="mb-6 border-b border-gray-200 pb-6">
          <div className="mb-2 flex items-start">
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{product.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <span className="mr-2 text-sm text-gray-500">Price:</span>
                  <span className="mr-1 text-sm text-gray-400 line-through">
                    ${(product.price * 1.25).toFixed(2)}
                  </span>
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-5" />
                </button>
              </div>
              <div className="mt-1">
                <span className="mr-2 text-sm text-gray-500">Stock:</span>
                <span className="text-green-600">In Stock</span>
              </div>
            </div>
          </div>
          <button className="w-full rounded border border-gray-300 py-2 text-gray-700 hover:bg-gray-100">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};
export default MobileWishlist;
