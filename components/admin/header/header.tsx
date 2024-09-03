"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  {
    id: 6,
    name: "Sizes",
    href: "/admin/sizes",
  },
  {
    id: 7,
    name: "Colors",
    href: "/admin/colors",
  },
  {
    id: 8,
    name: "Media",
    href: "/admin/media",
  },
];

const Navlinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {links.map(link => {
        const isActive = pathname.includes(link.href);

        return (
          <li key={link.id}>
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
