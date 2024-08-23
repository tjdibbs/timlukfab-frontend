import { SwiperOptions } from "swiper/types";
import { v4 as uuidV4 } from "uuid"

export const breakpoints: {
  [p: number]: SwiperOptions;
  [p: string]: SwiperOptions;
} = {
  0: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
};

export const BASE_URL = process.env.NODE_ENV === "production"
  ? "http://api.frutiv.com"
  : "http://localhost:8000";

export enum Events {
  FILTERED = "FilteredProductsEvent",
  FILTER = "filterEvent",
  SORT = "SortEvent",
  NEW_PRODUCTS = "Products",
}

export const navLinks: { id: string; name: string; path: string; }[] = [
  {
    id: uuidV4(),
    name: "Home",
    path: "/"
  },
  {
    id: uuidV4(),
    name: "About us",
    path: "/about-us"
  },
  {
    id: uuidV4(),
    name: "Shop",
    path: "/shop"
  },
  {
    id: uuidV4(),
    name: "Contact",
    path: "/contact"
  },
]

export const categories = [
  "new in",
  "sale",
  "all",
  "tops",
  "dresses",
  "sets",
  "beach wear",
  "pants",
  "skirts",
  "rompers",
  "jumpsuits",
  "activewear",
  "accessories",
  "sweaters",
  "bodysuits",
  "denim",
  "luxe dresses",
  "bodysuits",
];