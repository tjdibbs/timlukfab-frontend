"use client";

import { categories, navLinks } from "@/lib/constants";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Heart, Menu, Search, ShoppingCart } from "react-feather";
import Headroom from "react-headroom";
import Nav from "./Nav";
import { v4 as uuidV4 } from "uuid";
import { useCart } from "../cart/cartProvider";
import { useAppSelector } from "@/lib/redux/store";
import { Skeleton } from "@/components/ui/skeleton";

const AppHeader = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);

  const openNav = () => setOpen(true);
  const closeNav = useCallback(() => setOpen(false), []);

  const { openCart } = useCart();

  const cartLength = useMemo(() => cart.length, [cart]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="sticky top-0 z-[99999] border-b border-b-[#ccc] bg-white">
        <div className="bg-black">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="wrapper flex items-center justify-between pb-1 pt-2">
          <Skeleton className="h-8 w-32" />
          <div className="hidden space-x-4 md:flex">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <Skeleton className="h-6 w-16" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-full" />
            ))}
          </div>
        </div>
        <div className="bg-[#fefefe] py-4">
          <div className="wrapper flex items-center space-x-4 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <Link
            href="/"
            className="text-2xl font-bold text-black hover:text-black/60"
          >
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
            <div
              className="relative flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 md:h-9 md:w-9"
              onClick={openCart}
            >
              <ShoppingCart className="max-md:4 w-5" />
              {cartLength > 0 && (
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartLength}
                </div>
              )}
            </div>
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
