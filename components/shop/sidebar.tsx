"use client";

import Link from "next/link";
import FilterSlider from "@/components/shop/range";
import RecentlyViewed from "./recent";

const links = [
  {
    id: 1,
    name: "All Collections",
    path: "/collections",
  },
  {
    id: 2,
    name: "Chic collections",
    path: "/collections/cheek-collections",
  },
  {
    id: 3,
    name: "Clearance sales",
    path: "/collections/clearance-sales",
  },
  {
    id: 4,
    name: "New arrivals",
    path: "/collections/new-arrivals",
  },
];

const Sidebar = () => {
  return (
    <div className="col-span-3 max-md:hidden">
      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase text-normal_grey">
          browse
        </h2>
        <ul>
          {links.map((link) => {
            return (
              <li key={link.id} className="border-b border-b-gray-200">
                <Link
                  href={link.path}
                  className="block py-3 text-xs font-semibold uppercase text-dark_grey hover:text-black"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold uppercase text-normal_grey">
          Filter by price
        </h2>

        {/* rc slider */}
        <FilterSlider />
      </div>
      <RecentlyViewed />
    </div>
  );
};
export default Sidebar;
