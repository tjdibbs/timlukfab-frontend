import { pink } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  brand: {
    position: "relative",
    overflow: "hidden",
    transition: "all .30s ease-in-out",
    width: "100%",
    "& .brand-content": {
      PointerEvent: "none",
      transition: "all .30s ease-in-out",
      opacity: 1,
    },
    "& .card-area": {
      filter: "brightness(30%)",
      transition: "all .30s ease-in-out",
    },
  },
  shopNow: {
    textTransform: "none",
    borderColor: "#fff",
    color: "#fff",
    transition: "all .30s ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
      transform: "scale(.9)",
      fontWeight: 600,
      color: pink[900],
    },
  },
  swiperBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileBrandCard: {
    width: "100%",
    maxHeight: 200,
    minHeight: 200,
    background: "rgba(0,0,0,.6)",
    borderRadius: "20px",
    border: "1px solid grey",
    marginBottom: "1em",
    position: "relative",
    "& .card-area": {
      filter: "brightness(40%)",
    },
  },
  swiper: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 50,
  },
  swiper_slide: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "320px",
    maxWidth: "50%",
    borderRadius: "10px",
    overflow: "hidden",
    height: "auto",
    "& img": {
      width: "100%",
      display: "block",
    },
  },
  cardArrival: {
    width: "100%",
    position: "relative",
    userSelect: "none",
    borderRadius: "0px",
    overflow: "hidden",
    color: "white",
    "& .quick-view": {
      position: "absolute",
      top: "50%",
      zIndex: 10,
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#000",
      color: "#fff",
    },
    "& .card-area": {
      height: "calc(100% - 80px)",
    },
    "&:hover": {
      "& .quick-view": {
        display: "block",
      },
    },
    "& .content": {
      width: "100%",
      backgroundColor: "rgba(0,0,0,.8)",
    },
  },
});

export default useStyles;
