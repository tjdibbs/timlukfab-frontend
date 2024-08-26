import { products } from "@/data";
import Image from "next/image";
import { X } from "react-feather";

const DesktopWishlist = () => {
  return (
    <div className="hidden md:block">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">PRODUCT NAME</th>
            <th className="pb-2">UNIT PRICE</th>
            <th className="pb-2">STOCK STATUS</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-gray-200">
              <td className="flex items-center gap-2 py-4">
                <button className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400 text-gray-400 hover:border-gray-600 hover:text-gray-600">
                  <X className="w-3" />
                </button>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="mr-4"
                />
                <span>{product.name}</span>
              </td>
              <td className="py-4">
                <span className="mr-2 text-gray-400 line-through">
                  ${(product.price * 1.25).toFixed(2)}
                </span>
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              </td>
              <td className="py-4 text-green-600">In Stock</td>
              <td className="py-4">
                <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DesktopWishlist;
