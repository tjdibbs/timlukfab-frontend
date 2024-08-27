"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { links } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/account/logoutButton";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="col-span-3 border-r border-r-[#eee] text-[#555] max-md:mb-8">
      <header className="mb-4 flex items-center gap-2">
        <Avatar className="h-16 w-16 max-md:h-14 max-md:w-14">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>BU</AvatarFallback>
        </Avatar>
        <span className="text-base text-[#777]">Benedict Umeozor</span>
      </header>
      <div>
        <ul>
          {links.map((link) => {
            const isActive =
              pathname === link.path
                ? "border-r-4 border-r-[#446084] text-black"
                : "";

            return (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className={`block border-b border-b-[#eee] py-4 font-semibold uppercase text-[#555] hover:border-r-4 hover:border-r-[#446084] hover:text-black max-md:text-sm ${isActive}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <LogoutButton
              text="logout"
              className="block w-full py-4 text-left font-semibold uppercase text-[#555] hover:border-r-2 hover:border-r-[#446084] hover:text-black max-md:text-sm"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
