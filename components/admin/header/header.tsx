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
    <ul className="flex items-center gap-6">
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

const AdminHeader = () => {
  return (
    <header>
      <div className="wrapper flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Timlukfab
        </Link>

        <Navlinks />

        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>BU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
export default AdminHeader;
