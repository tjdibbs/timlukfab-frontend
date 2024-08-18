import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwitchButton from "./switch";
import { Button, SwipeableDrawer } from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import useStyles from "@lib/styles";
import SwipeableViews from "react-swipeable-views";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import { auth } from "@lib/redux/reducer";
import { useRouter } from "next/router";
import { menuItems, themes } from "./menu";
import axios from "axios";
import Cookies from "js-cookie";

// Icons
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import UploadIcon from "@mui/icons-material/Upload";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import ShopRoundedIcon from "@mui/icons-material/ShopRounded";
import MenuItem from "@mui/material/MenuItem";
import stringToColor from "@lib/stringToColor";
import { BASE_URL } from "@lib/constants";

interface SideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const navData = [
  {
    label: "Shop by",
    icon: ShopRoundedIcon,
    link: "/collections",
    submenu: [
      {
        label: "Brand",
        submenu: [
          "Louis Vuitton",
          "Gucci",
          "Jordan",
          "Reebok",
          "Nike",
          "Prada",
        ],
      },
      {
        label: "Category",
        submenu: ["Pants", "T-Shirts", "Shirts", "Sneakers", "Sports", "Pam"],
      },
    ],
  },
];

export default function Sidebar(props: SideBarProps) {
  const theme = useTheme();
  const { open, setOpen } = props;
  const user = useAppSelector((state) => state.shop.user);
  const styles = useStyles();
  const [value, setValue] = React.useState({ title: "shop_by", index: 0 });
  const [shopValue, setShopValue] = React.useState({ index: 0, value: 0 });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    axios.get(BASE_URL + "/logout").then(() => {
      dispatch(auth());
      Cookies.remove("sid");
      if (router.pathname.indexOf("upload") !== -1) router.replace("/");
    });
  };

  const handleClose = (link: string) => {
    setValue({ title: "", index: 0 });
    setShopValue({ index: 0, value: 0 });
    setOpen(false);
    router.push(link);
  };

  const handleClick = () => {
    setValue({ title: "", index: 0 });
    setShopValue({ index: 0, value: 0 });
    setOpen(false);
  };

  // const TabItem = () => ()

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      className={"shop-sidebar"}
      onClose={handleClick}
      onOpen={() => setOpen(true)}
    >
      <div className="w-[300px] min-h-screen max-w-screen bg-primary-low/20">
        {user && (
          <div className="menu-header p-4 flex gap-x-4">
            <Avatar
              src={user!.image}
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                bgcolor: stringToColor(user!.firstname + " " + user!.lastname),
              }}
            >
              {user!.firstname.at(0)}
              {user!.lastname.at(0)}
            </Avatar>
            <div className="text">
              <span className="name text-sm font-bold capitalize">
                {user!.firstname} {user!.lastname}
              </span>
              <span className="email text-xs">{user!.email}</span>
            </div>
          </div>
        )}
        <Divider />
        <Box className={"navigation"}>
          <SwipeableViews index={value.index} animateHeight disabled>
            <Box className={"nav-page"}>
              <List>
                {user && (
                  <React.Fragment>
                    {Boolean(user?.admin) && (
                      <Link href={"/products/upload"} onClick={handleClick}>
                        <ListItemButton>
                          <ListItemIcon>
                            <UploadIcon fontSize="small" />
                          </ListItemIcon>
                          <span className="text-sm">Upload Products</span>
                        </ListItemButton>
                      </Link>
                    )}
                  </React.Fragment>
                )}

                {menuItems.map((item) => (
                  <Link href={item.url} key={item.label} onClick={handleClick}>
                    <MenuItem>
                      <ListItemIcon>
                        <item.icon fontSize="small" />
                      </ListItemIcon>
                      <span className="text-sm">{item.label}</span>
                    </MenuItem>
                  </Link>
                ))}
                {/* <MenuItem
                  onClick={() => setValue({ title: "theme", index: 1 })}
                >
                  <ListItemIcon>
                    <ModelTrainingIcon fontSize={"small"} />
                  </ListItemIcon>
                  <span className="text-sm">Theme</span>
                  <IconButton>
                    <ArrowForwardIosRoundedIcon fontSize={"small"} />
                  </IconButton>
                </MenuItem> */}
                <MenuItem>
                  <Link
                    href={"/collections"}
                    className={"flex gap-x-1 items-center flex-grow"}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemIcon>
                      <ShopRoundedIcon fontSize={"small"} />
                    </ListItemIcon>
                    <span className="text-sm"> Shop By</span>
                  </Link>
                  <IconButton
                    onClick={() => setValue({ title: "shop_by", index: 1 })}
                  >
                    <ArrowForwardIosRoundedIcon fontSize={"small"} />
                  </IconButton>
                </MenuItem>
                {user && (
                  <MenuItem
                    onClick={() => {
                      handleClick();
                      logout();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <span className="text-sm"> Logout</span>
                  </MenuItem>
                )}
              </List>
            </Box>
            <Box pb={2} className={"nav-page"}>
              <SwipeableViews index={shopValue.index} disabled animateHeight>
                <Box pb={2} className={"nav-page"} height={500}>
                  {value.title !== "theme" ? (
                    <Box>
                      <TabHeader
                        label="Shop By"
                        onClick={() => setValue({ title: "", index: 0 })}
                      />
                      <List>
                        {["Brands", "Styles"].map((title, index) => {
                          return (
                            <ListItemButton
                              key={index}
                              onClick={() =>
                                setShopValue({ index: 1, value: index })
                              }
                            >
                              <ListItemText primary={title} />
                              <ArrowForwardIosRoundedIcon fontSize={"small"} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Box>
                  ) : (
                    <Box sx={{ position: "relative" }}>
                      <TabHeader
                        label="Theme"
                        onClick={() => setValue({ title: "theme", index: 0 })}
                      />
                      <ul className="themes min-h-max" role="list">
                        {themes.map((theme, index) => {
                          return (
                            <li
                              className={
                                "flex justify-between p-4 items-center"
                              }
                              key={index}
                            >
                              <Box
                                sx={{ alignItems: "center", display: "flex" }}
                              >
                                <theme.icon />
                                <span>{theme.label}</span>
                              </Box>
                              <SwitchButton
                                name={
                                  theme.name as "dark" | "light" | "default"
                                }
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  )}
                </Box>
                {value.title !== "theme" ? (
                  <Box pb={2} className={"nav-page"}>
                    <TabHeader
                      label={navData[0].submenu![shopValue.value]?.label}
                      onClick={() => setShopValue({ value: 0, index: 0 })}
                    />
                    <List>
                      {navData[0].submenu![shopValue.value]?.submenu?.map(
                        (title, index) => {
                          return (
                            <ListItemButton
                              key={index}
                              onClick={() =>
                                handleClose(
                                  `/collections?shop_by=${navData[0].submenu![
                                    shopValue.value
                                  ]?.label.toLowerCase()}&name=${title}`
                                )
                              }
                            >
                              <ListItemText primary={title} />
                            </ListItemButton>
                          );
                        }
                      )}
                    </List>
                  </Box>
                ) : (
                  <></>
                )}
              </SwipeableViews>
            </Box>
          </SwipeableViews>
        </Box>
        <Box className="absolute bottom-0 w-full p-4">
          {!user && (
            <div className="card-actions">
              <Link href={"/sign-in"} className="w-full block mb-3">
                <Button
                  variant="contained"
                  onClick={handleClick}
                  fullWidth
                  className="shadow-lg rounded-lg bg-primary-low capitalize"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/sign-up"} className="w-full block mb-3">
                <Button
                  onClick={handleClick}
                  size={"small"}
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          <div
            className={"social-icons flex gap-x-3 justify-center items-center "}
          >
            <Link href="https://instagram.com/pauloxuries">
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Link>
            <Link href="https://twitter.com/pauloxuries">
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </Link>
            <Link href="https://facebook.com/pauloxuries">
              <IconButton>
                <FacebookRoundedIcon />
              </IconButton>
            </Link>
          </div>
        </Box>
      </div>
    </SwipeableDrawer>
  );
}

const TabHeader = (props: {
  label: string;
  onClick: React.MouseEventHandler;
}) => (
  <div className={"sticky top-0 z-10 bg-primary-low/10"}>
    <IconButton onClick={props.onClick}>
      <ArrowBackIosRoundedIcon fontSize={"small"} />
    </IconButton>
    <span className={"font-semibold text-sm"}>{props.label}</span>
  </div>
);

// const NavItem = (props: {icon: boolean}) => (

// )
