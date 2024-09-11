"use client";

import { navLinks } from "@/lib/constants";
import { useAppSelector } from "@/lib/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Fragment,
  memo,
  ReactNode,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Heart, Menu, Search, ShoppingCart } from "react-feather";
import Headroom from "react-headroom";
import { useCart } from "../cart/cartProvider";
import { accountLinks } from "@/data";
import { useIsClient } from "@/hooks/useIsClient";
import { createPortal } from "react-dom";
import Nav from "./Nav";
import LogoutButton from "../account/logoutButton";
import { Button } from "../ui/button";

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  const isClient = useIsClient();

  if (!isClient) return <AppHeaderSkeleton />;

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-white">
        <Suspense fallback={<AppHeaderSkeleton />}>{children}</Suspense>
      </header>
    </Fragment>
  );
};

export const NavLinks = memo(() => {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center justify-center gap-6 lg:flex">
      {navLinks.map(link => {
        const isActive = pathname === link.path;
        return (
          <li key={link.id}>
            <Link
              href={link.path}
              className={`font-semibold uppercase hover:text-black/60 ${
                isActive ? "text-black" : "text-black/60"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
});

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

export const HeaderActions = memo(() => {
  const [open, setOpen] = useState(false);
  const credentials = useAppSelector(state => state.auth.token);

  const { cartLength } = useCart();

  const openNav = useCallback(() => setOpen(true), []);
  const closeNav = useCallback(() => setOpen(false), []);

  const { openCart } = useCart();

  return (
    <Fragment>
      {open &&
        createPortal(<Nav isOpen={open} closeFn={closeNav} />, document.body)}
      <div className="flex items-center justify-end gap-4">
        {credentials ? (
          <AccountDropdown />
        ) : (
          <Link
            href="/login"
            className="font-semibold uppercase text-black hover:text-black/60 max-lg:hidden"
          >
            Login
          </Link>
        )}
        <Button size={"icon"} variant={"ghost"}>
          <Search className="max-md:4 w-5" />
        </Button>
        {!!credentials && (
          <Fragment>
            <Button size={"icon"} variant={"ghost"}>
              <Heart className="max-md:4 w-5" />
            </Button>
            <Button size={"icon"} variant={"ghost"} onClick={openCart}>
              <ShoppingCart className="max-md:4 w-5" />
              {cartLength > 0 && (
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartLength}
                </div>
              )}
            </Button>
          </Fragment>
        )}
        <button
          onClick={openNav}
          className="flex items-center justify-center rounded-full hover:bg-gray-100 lg:hidden"
        >
          <Menu className="max-md:4 w-5" />
        </button>
      </div>
    </Fragment>
  );
});

const AccountDropdown = () => {
  return (
    <Fragment>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href="/account"
            className="font-semibold uppercase text-black hover:text-black/60 max-lg:hidden"
          >
            My Account
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {accountLinks.map(link => (
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
        </HoverCardContent>
      </HoverCard>
    </Fragment>
  );
};

export default HeaderWrapper;
