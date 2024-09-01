"use client";

import { categories, navLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Menu, Search, ShoppingCart } from "react-feather";
import Headroom from "react-headroom";
import Nav from "./Nav";
import { useCart } from "../cart/cartProvider";
import { useAppSelector } from "@/lib/redux/store";
import { useIsClient } from "@/hooks/useIsClient";
import { v4 as uuidV4 } from "uuid";
import { accountLinks } from "@/data";
import LogoutButton from "../account/logoutButton";

const AppHeader = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);

  const openNav = useCallback(() => setOpen(true), []);
  const closeNav = useCallback(() => setOpen(false), []);

  const { openCart } = useCart();

  const cartLength = useMemo(() => cart.length, [cart]);

  const isClient = useIsClient();

  if (!isClient) {
    return <AppHeaderSkeleton />;
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
          <NavLinks pathname={pathname} />
          <HeaderActions
            openNav={openNav}
            openCart={openCart}
            cartLength={cartLength}
          />
        </div>
        <CategoryList />
      </header>
    </Headroom>
  );
};

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative max-md:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/account"
        className="font-semibold uppercase text-black hover:text-black/60"
      >
        My Account
      </Link>
      {isOpen && (
        <div
          className="absolute right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {accountLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {link.name}
              </Link>
            ))}
            <LogoutButton
              text="Logout"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const NavLinks = memo(({ pathname }: { pathname: string }) => (
  <ul className="hidden items-center justify-center gap-6 md:flex">
    {navLinks.map((link) => {
      const isActive = pathname === link.path;
      return (
        <li key={link.id}>
          <Link
            href={link.path}
            className={`font-semibold uppercase hover:text-black/60 ${
              isActive ? "text-primary" : "text-black"
            }`}
          >
            {link.name}
          </Link>
        </li>
      );
    })}
  </ul>
));

const HeaderActions = memo(
  ({
    openNav,
    openCart,
    cartLength,
  }: {
    openNav: () => void;
    openCart: () => void;
    cartLength: number;
  }) => {
    const credentials = useAppSelector((state) => state.auth.token);

    return (
      <div className="flex items-center justify-end gap-3 md:gap-4">
        {credentials ? (
          <AccountDropdown />
        ) : (
          <Link
            href="/login"
            className="font-semibold uppercase text-black hover:text-black/60 max-md:hidden"
          >
            Login
          </Link>
        )}
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
    );
  },
);

const CategoryList = memo(() => (
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
));

const AppHeaderSkeleton = () => (
  <div className="sticky top-0 z-[99999] border-b border-b-[#ccc] bg-white">
    <div className="wrapper flex items-center justify-between py-4">
      <div className="h-8 w-24 animate-pulse bg-gray-200"></div>
      <div className="flex items-center space-x-4">
        <div className="h-6 w-16 animate-pulse bg-gray-200"></div>
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 md:hidden"></div>
      </div>
    </div>
    <div className="bg-[#fefefe] py-4">
      <div className="wrapper no-scrollbar flex items-center overflow-x-auto">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="mx-2 h-6 w-20 animate-pulse rounded bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export default AppHeader;
