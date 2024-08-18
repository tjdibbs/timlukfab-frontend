import { SwiperOptions } from "swiper";

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
