"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  },
];

const Navlinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-4">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li>
            <Link
              href={link.href}
              className={
                "block font-semibold transition-colors hover:text-black " +
                (isActive ? "text-black" : "text-normal_grey")
              }
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
      <div className="wrapper flex items-center py-4">
        <div className="flex flex-[2] items-center gap-12">
          <Link href="/" className="text-2xl font-bold">
            Timlukfab
          </Link>
          <Navlinks />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Search..." />
            <Avatar>
              <AvatarImage src="" alt="avatar" />
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
