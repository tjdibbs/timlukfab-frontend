"use client";

import { categories, navLinks } from "@/lib/constants";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Menu, Search, ShoppingCart } from "react-feather";
import Headroom from "react-headroom";
import Nav from "./Nav";
import { v4 as uuidV4 } from "uuid";

const AppHeader = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  const openNav = () => setOpen(true);
  const closeNav = useCallback(() => setOpen(false), []);

  return (
    <Headroom className="z-[999]">
      {isOpen &&
        createPortal(<Nav isOpen={isOpen} closeFn={closeNav} />, document.body)}
      <header className="sticky top-0 z-[99999] border-b border-b-[#ccc] bg-white">
        <div className="bg-black text-center text-white">
          <div className="wrapper py-2 text-center text-xs">
            Great news! Free shipping on all orders above N200,000
          </div>
        </div>
        <div className="wrapper flex items-center justify-between pb-1 pt-2">
          <Link href="/" className="text-2xl font-bold text-black">
            Timlukfab
          </Link>
          <ul className="hidden items-center justify-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.id}>
                  <Link
                    href={link.path}
                    className={`font-semibold uppercase hover:text-black/60 ${isActive ? "text-primary" : "text-black"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <Link
              href="/login"
              className="font-semibold uppercase text-black hover:text-black/60"
            >
              Login
            </Link>
            <button className="flex items-center justify-center rounded-full hover:bg-gray-100 md:h-9 md:w-9">
              <Search className="max-md:4 w-5" />
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-gray-100 md:h-9 md:w-9">
              <Heart className="max-md:4 w-5" />
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-gray-100 md:h-9 md:w-9">
              <ShoppingCart className="max-md:4 w-5" />
            </button>
            <button
              onClick={openNav}
              className="flex items-center justify-center rounded-full hover:bg-gray-100 md:hidden md:h-9 md:w-9"
            >
              <Menu className="max-md:4 w-5" />
            </button>
          </div>
        </div>
        <div className="bg-[#fefefe] py-4">
          <div className="wrapper no-scrollbar flex items-center overflow-x-auto">
            {categories.map((category, index) => (
              <p
                key={uuidV4()}
                className={
                  "category-text cursor-pointer whitespace-nowrap rounded px-4 py-1 text-[0.875rem] uppercase hover:bg-gray-100 max-md:text-xs " +
                  (index === 0 ? "text-primary" : "text-black")
                }
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </header>
    </Headroom>
  );
};
export default AppHeader;
