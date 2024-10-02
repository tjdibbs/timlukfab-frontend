import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { useAppSelector } from "@/lib/redux/store";
import { usePathname } from "next/navigation";
import LogoutButton from "../account/logoutButton";
import { FacebookFilled, InstagramFilled, XOutlined } from "@ant-design/icons";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Shop",
    path: "/shop",
  },
];

const HamburgerMenu = () => {
  const auth = useAppSelector(state => state.auth.token);

  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={cn("lg:hidden")}>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={cn("grid grid-rows-[1fr_auto] lg:hidden")}
      >
        <div className="py-8">
          <ul>
            {links.map(link => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={link.path}
                    className={clsx(
                      "block cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100",
                      { "bg-gray-100": pathname === link.path }
                    )}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
            {!auth && (
              <li>
                <SheetClose asChild>
                  <Link
                    href={"/login"}
                    className={clsx(
                      "block cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100",
                      { "bg-gray-100": pathname === "/login" }
                    )}
                  >
                    Login
                  </Link>
                </SheetClose>
              </li>
            )}
            {auth && (
              <li>
                <SheetClose asChild>
                  <Link
                    href={"/account"}
                    className={clsx(
                      "block cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100",
                      { "bg-gray-100": pathname.includes("/account") }
                    )}
                  >
                    Account
                  </Link>
                </SheetClose>
              </li>
            )}
            {auth && (
              <li>
                <SheetClose asChild>
                  <LogoutButton
                    className={cn(
                      "block w-full cursor-pointer border-b px-3 py-4 text-left text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100"
                    )}
                    text="Logout"
                  />
                </SheetClose>
              </li>
            )}
          </ul>
        </div>

        <SheetFooter>
          <footer className="flex items-center gap-4 p-3">
            <a href="/">
              <XOutlined style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
            <a href="/">
              <InstagramFilled style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
            <a href="/">
              <FacebookFilled style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
          </footer>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
