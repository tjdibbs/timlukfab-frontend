import {
  IconButton,
  Button,
  useTheme,
  Badge,
  Collapse,
  Box,
  ListItemButton,
  List,
  Chip,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { HeaderProps } from "@utils/types";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import Sidebar from "./sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import Searchbar from "./searchbar";
import { navData } from "./sidebar";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useAppSelector } from "@lib/redux/store";
import Navigation from "./menu";
import SwitchButton from "./switch";
import dynamic from "next/dynamic";
import Image from "next/image";

type ShopMenu = Partial<{ brand: boolean; style: boolean; occasion: boolean }>;

const Header: React.FC<HeaderProps> = (): JSX.Element => {
  const theme = useTheme();
  const [width, setWidth] = React.useState<boolean>(window.innerWidth < 600);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [menu, setMenu] = React.useState<number>(0);
  const user = useAppSelector((state) => state.shop.user);
  const router = useRouter();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setWidth(true);
      } else setWidth(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="page-header sticky top-0 z-50 bg-gray-300">
        {!user && (
          <div className={"offer bg-primary-low dark:bg-[#2a271c] py-2 px-4"}>
            {/* @ts-ignore */}
            <marquee className="text-sm font-semibold text-center leading-7">
              Limited Time Only: Get 10% off your first order when you{" "}
              <Link
                href="/sign-up"
                className="text-white font-bold bg-black/5 rounded-lg py-1 px-3"
              >
                SIGN UP
              </Link>
              {/* @ts-ignore */}
            </marquee>
          </div>
        )}
        <div className="bg-primary/10">
          <div className="flex justify-between items-center px-3 mx-auto max-w-[1100px]">
            {width && (
              <IconButton
                color="inherit"
                className={"sidebar-toggle"}
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link href={"/"} className="flex-grow md:flex-grow-0">
              <Image
                src={`/identity/logo.png`}
                alt={"Pauloxuries logo"}
                width={180}
                height={60}
                priority
                className={`sm:w-full object-fill  pointer-events-none`}
              />
            </Link>
            <div
              className="desktop-menu-wrapper h-[60px] py-4"
              onMouseLeave={() => {
                setOpenMenu(false);
                setTimeout(() => {
                  document.body.classList.remove("searching");
                }, 500);
              }}
            >
              <div className="flex-grow font-[600] hidden md:flex justify-center">
                <div
                  onMouseEnter={() => {
                    setOpenMenu(true);
                    document.body.classList.add("searching");
                  }}
                >
                  <ListItemButton
                    className="rounded-xl"
                    onClick={() => setOpenMenu(false)}
                  >
                    <Link href={"/collections"} className="flex gap-x-2">
                      <span className="text-sm font-semibold">Collections</span>
                      <KeyboardArrowDownRoundedIcon sx={{ fontSize: "16px" }} />
                    </Link>
                  </ListItemButton>
                  <DropDownMenu
                    {...{ setOpenMenu, openMenu, user: Boolean(user) }}
                  />
                </div>
              </div>
            </div>
            <div className="icons-wrapper flex gap-x-4">
              <IconButton onClick={() => setOpenSearch(!openSearch)}>
                <SearchRoundedIcon />
              </IconButton>
              <CountCart />
              {/* {!width && !user && <NotSignedInSwitch />} */}
              {!width && !user && (
                <Link
                  className="text-primary-low"
                  href={
                    router.pathname === "/sign-in" ? "/sign-up" : "/sign-in"
                  }
                >
                  <Button variant="outlined" size="small" color="inherit">
                    {router.pathname === "/sign-in" ? "Sign Up" : "Sign In"}
                  </Button>
                </Link>
              )}
              {user && !width && <Navigation user={user} />}
            </div>
          </div>
        </div>
      </header>
      {width && <Sidebar open={open} setOpen={setOpen} />}
      <Searchbar open={openSearch} setOpenSearch={setOpenSearch} />
    </>
  );
};

// This is created seperately for optimization
// when the cart changed, only this component will re-render
const CountCart = dynamic(
  async () =>
    function CountCart() {
      const shop = useAppSelector((state) => state.shop);
      const router = useRouter();

      return (
        <IconButton onClick={() => router.push("/cart")}>
          <Badge color="primary" badgeContent={shop.cart.length} showZero>
            <ShoppingCartRounded fontSize="medium" />
          </Badge>
        </IconButton>
      );
    },
  { ssr: false }
);

const NotSignedInSwitch = () => {
  const mode = useAppSelector((state) => state.shop.mode);
  const [theme, setTheme] = React.useState<typeof mode>("light");

  React.useEffect(() => {
    setTheme(mode == "light" ? "dark" : "light");
  }, [mode]);

  return <SwitchButton name={theme} checked={mode === "dark"} />;
};

const DropDownMenu = (props: {
  setOpenMenu: (value: React.SetStateAction<boolean>) => void;
  openMenu: boolean;
  user: boolean;
}) => {
  return (
    <Collapse
      in={props.openMenu}
      className={
        "absolute transition-all left-1/2 z-[10000] -translate-x-1/2 " +
        (props.user ? "top-[70%]" : "top-[85%]")
      }
    >
      <div className="wrap bg-gray-300 mt-4 rounded-b-xl">
        <div className="card bg-primary/10 rounded-b-xl w-full md:w-[1100px] flex flex-wrap gap-4 max-w-[100vw] overflow-visible p-4">
          {navData[0].submenu!?.map((submenu, index) => {
            return (
              <div
                key={index}
                className="bg-white relative shadow-lg p-3 rounded-lg"
              >
                <div className="label text-sm font-bold ml-2">
                  {submenu.label}
                </div>
                <List className="flex gap-x-3">
                  {submenu.submenu.map((title) => (
                    <Chip
                      key={title}
                      onClick={() => props.setOpenMenu(false)}
                      label={
                        <Link
                          href={`/collections?shop_by=${submenu.label.toLowerCase()}&name=${title.toLowerCase()}`}
                        >
                          {title}
                        </Link>
                      }
                    />
                  ))}
                </List>
              </div>
            );
          })}
        </div>
      </div>
    </Collapse>
  );
};

export default dynamic(async () => Header, {
  ssr: false,
  loading: () => (
    <div className="stick top-0 h-16 bg-primary-low animate-pulse" />
  ),
});
