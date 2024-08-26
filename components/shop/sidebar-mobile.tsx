"use client";

import FilterSlider from "@/components/shop/range";
import { SlidersHorizontalIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import RecentlyViewed from "./recent";
import Link from "next/link";
import { X } from "react-feather";
import { v4 as uuidV4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

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

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <Fragment>
      <button
        className="flex items-center gap-2 text-normal_grey hover:text-dark_grey md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontalIcon width={14} />
        <p className="text-sm">Filter</p>
      </button>
      {isOpen && (
        <motion.div
          key={uuidV4()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-[999999] block h-screen w-full bg-black/80 md:hidden"
        >
          <button
            className="absolute right-0 top-0 z-[9999999] flex h-10 w-10 items-center justify-center rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 text-white" />
          </button>
          <AnimatePresence>
            <motion.div
              key={uuidV4()}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-[70%] max-w-[300px] overflow-y-auto bg-white px-2"
            >
              <div className="mt-6">
                <h2 className="mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base">
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
                <h2 className="mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base">
                  Filter by price
                </h2>

                {/* rc slider */}
                <FilterSlider />
              </div>
              <RecentlyViewed />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </Fragment>
  );
};
export default SidebarMobile;
