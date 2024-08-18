import React from "react";
import { CssBaseline } from "@mui/material";
import Theme from "../utils/theme";
import { LayoutProps } from "../utils/types";
import { Box, ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import HeaderWrapper from "@comp/header/wrapper";
import Footer from "@comp/footer";
import Cookie from "js-cookie";
import { setMode } from "@lib/redux/reducer";
import CookieAlert from "@comp/cookie-alert";
import Viewed from "@comp/viewed";

type THEME = "default" | "dark" | "light";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const mode = useAppSelector((state) => state.shop.mode);
  const theme = useAppSelector((state) => state.shop.theme);
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   if (theme === "default") {
  //     document.body.className = "default";
  //   } else if (theme === "dark") {
  //     document.body.className = "dark";
  //   } else {
  //     document.body.className = "";
  //   }
  // }, [theme]);

  // React.useEffect(() => {
  //   dispatch(setMode((Cookie.get("theme") as THEME) ?? "default"));
  // }, [dispatch]);

  return (
    <ThemeProvider theme={Theme("light")}>
      <CssBaseline />
      <HeaderWrapper />
      <Box minHeight={600} className={"main-container"}>
        {children}
      </Box>
      <Viewed />
      <Footer />
      <CookieAlert />
    </ThemeProvider>
  );
};

export default Layout;
