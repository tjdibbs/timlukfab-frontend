import Sidebar from "./sidebar";
import Products from "./products";
import SidebarMobile from "./sidebar-mobile";
import { Fragment, Suspense } from "react";
import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import SidebarSkeleton from "../ui/sidebarskeleton";

const breadCrumbLinks: BreadCrumbLink[] = [
  {
    id: 1,
    name: "Home",
    href: "/",
    isPage: false,
  },
  {
    id: 2,
    name: "Shop",
    href: "/shop",
    isPage: true,
  },
];

const Shop = () => {
  return (
    <div>
      <div className="mb-8 flex items-center max-md:flex-col max-md:gap-4 md:justify-between">
        <div>
          <BreadCrumbComponent links={breadCrumbLinks} />
        </div>
        <SidebarMobile />
        <div className="flex items-center justify-end gap-8">
          <p className="text-[#777] max-md:hidden">
            Showing 1–12 of 23 results
          </p>
          <div>
            <select
              defaultValue={"default"}
              className="w-40 cursor-pointer rounded-sm border border-x-gray-200 bg-gray-100 p-2 px-3 focus:outline-none max-md:px-2 max-md:text-sm"
            >
              <option value="default">Default sorting</option>
              <option value="popularity">Sort by popularity</option>
              <option value="rating">Sort by average rating</option>
              <option value="latest">Sort by latest</option>
              <option value="price">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16 max-md:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Products />
      </div>
    </div>
  );
};
export default Shop;
