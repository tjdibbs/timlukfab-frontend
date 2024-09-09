"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Menu } from "react-feather";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

const links = [
  {
    id: 1,
    name: "Overview",
    href: "/admin",
  },
  {
    id: 2,
    name: "Products",
    href: "/admin/products",
  },
  {
    id: 3,
    name: "Orders",
    href: "/admin/orders",
  },
  {
    id: 4,
    name: "Customers",
    href: "/admin/customers",
  },
  {
    id: 5,
    name: "Categories",
    href: "/admin/categories",
    subItems: [
      { id: 51, name: "Categories", href: "/admin/categories" },
      { id: 52, name: "Sub Categories", href: "/admin/sub-categories" },
    ],
  },
  {
    id: 7,
    name: "Sizes",
    href: "/admin/sizes",
  },
  {
    id: 8,
    name: "Colors",
    href: "/admin/colors",
  },
  {
    id: 9,
    name: "Media",
    href: "/admin/media",
  },
];

const Navlinks = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 lg:flex">
      {links.map(link => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/admin" && pathname.startsWith(link.href));

        if (link.subItems) {
          return (
            <li key={link.id}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "flex items-center font-semibold transition-colors hover:text-black",
                    isActive ? "text-black" : "text-normal_grey"
                  )}
                >
                  {link.name} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subItems.map(subItem => (
                    <DropdownMenuItem key={subItem.id}>
                      <Link href={subItem.href} className="block w-full">
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        }

        return (
          <li key={link.id}>
            <Link
              href={link.href}
              className={cn(
                "block font-semibold transition-colors hover:text-black",
                isActive ? "text-black" : "text-normal_grey"
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const MobileNav = () => {
  return (
    <nav className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center bg-black/50 lg:hidden"></nav>
  );
};

const AdminHeader = () => {
  return (
    <header>
      {/* {createPortal(<MobileNav />, document.body)} */}
      <div className="wrapper flex items-center justify-between py-4">
        <Link href="/" className="block w-40 max-md:w-28">
          <Image
            src={"/identity/logo.png"}
            alt="logo"
            height={50}
            width={50}
            className="w-full max-w-full"
          />
        </Link>

        <Navlinks />

        <div className="flex items-center gap-1">
          <Button className="lg:hidden" variant={"ghost"}>
            <Menu />
          </Button>
          <Avatar>
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
