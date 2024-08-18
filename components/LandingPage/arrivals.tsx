import React from "react";
import Product from "../product";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";
import useStyles from "@lib/styles";
import { Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import type { Product as ProductType } from "@lib/types";
import Loading from "../loading";
import Grid from "@mui/material/Grid";
import AliceCarousel from "react-alice-carousel";
import { useAppSelector } from "@lib/redux/store";
import { BASE_URL, breakpoints } from "@lib/constants";
import ProductStyle2 from "@comp/productStyle2";
import Box from "@mui/material/Box";
import { nanoid } from "nanoid";

const responsive = {
  0: { items: 2 },
  800: { items: 3 },
  1024: { items: 4 },
};

export default function NewArrivals() {
  const styles = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newArrivals, setNewArrivals] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    axios
      .get<{ products: ProductType[] }>(BASE_URL + "/api/products/new")
      .then((response) => {
        if (!response.data.products) return;

        setNewArrivals(response.data.products);
        setLoading(false);
      });
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={breakpoints}
      className="px-2 py-6"
    >
      {loading
        ? Array.from(new Array(4)).map((i) => (
            <SwiperSlide
              key={nanoid()}
              className={"max-w-[50%] sm:max-w-[300px]"}
            >
              <Loading />
            </SwiperSlide>
          ))
        : newArrivals.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <Product item={item} />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
