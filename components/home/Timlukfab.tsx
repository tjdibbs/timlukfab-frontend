import product7 from "@/assets/images/products/product7.jpg";
import product8 from "@/assets/images/products/product8.jpg";
import product9 from "@/assets/images/products/product9.jpg";
import Image from "next/image";

const Timlukfab = () => {
  return (
    <div className="my-16">
      <div className="wrapper flex items-start max-md:block">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 max-md:mb-8">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-500">
            <Image
              src={product7}
              alt="Product"
              height={100}
              width={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full px-2 text-center">
            <h2 className="mb-1 text-lg font-semibold text-gray-700">
              WHY CHOOSE TIMLUFAB
            </h2>
            <p className="text-gray-600">
              Chic, innovative, and inclusive fashion! Timfukab is dedicated to
              fulfilling your style aspirations. At Timfukab, we take pride in
              delivering exceptional service and fashion that’s accessible and
              affordable to everyone.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 max-md:mb-8">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-500">
            <Image
              src={product8}
              alt="Product"
              height={100}
              width={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full px-2 text-center">
            <h2 className="mb-1 text-lg font-semibold text-gray-700">
              STAY CONNECTED WITH TIMFUKAB
            </h2>
            <p className="text-gray-600">
              Fashion speaks volumes, so make sure you’re always in style!
              Discover creative ways to enhance your wardrobe. From office chic
              to weekend casual, if you’re seeking the latest trends and outfit
              inspiration, Timfukab has you covered!
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-500">
            <Image
              src={product9}
              alt="Product"
              height={100}
              width={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full px-2 text-center">
            <h2 className="mb-1 text-lg font-semibold text-gray-700">
              FASHION IS CONSTANTLY EVOLVING
            </h2>
            <p className="text-gray-600">
              We cater to all styles, from trendy to timeless, from casual
              outings to formal events. At Timfukab, we strive to offer our
              customers fashionable, affordable, and readily available attire
              that meets their needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timlukfab;
