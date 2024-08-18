import { createTheme } from "@mui/material";
import { grey, pink } from "@mui/material/colors";

const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      primary: {
        main: "#997a00",
        // light: "#ffcc00",
      },
      text: {
        primary: "#141106",
        secondary: grey[800],
      },
    },
    typography: {
      fontFamily: "Nunito, calibri",
    },
  });

export default theme;
