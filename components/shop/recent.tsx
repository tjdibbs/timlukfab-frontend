"use client";
import image from "@/assets/images/products/product10.jpg";
import Image from "next/image";

const RecentlyViewed = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base">
        Recently viewed
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12">
            <Image
              src={image}
              alt="product"
              width={64}
              height={64}
              className="h-full max-w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium">Black pink top</h3>
            <p className="text-sm text-normal_grey">$100</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecentlyViewed;
