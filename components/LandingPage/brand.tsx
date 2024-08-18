import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import useStyles from "@lib/styles";
import Product from "../product";
import { Product as ProductType } from "@lib/types";
import axios from "axios";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import Loading from "../loading";
import { Typography } from "@mui/material";

export default function App() {
  const styles = useStyles();

  const [hotBrand, setHotBrand] = React.useState<ProductType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    axios
      .get<{ success: boolean; products: ProductType[] }>(
        "/api/products?limit=12"
      )
      .then((response) => {
        const { success, products } = response.data;
        if (success) {
          setHotBrand(products);
          setLoading(false);
          return;
        }

        enqueueSnackbar("Internal Server Error", {
          variant: "error",
        });
      })
      .catch(() => {
        enqueueSnackbar("There is problem fetching search products", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar]);

  return hotBrand?.length ? (
    <Swiper
      slidesPerView={"auto"}
      loop={true}
      pagination={{ clickable: true }}
      spaceBetween={10}
      freeMode={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        400: {
          spaceBetween: 10,
        },
      }}
      modules={[Pagination, Autoplay, Navigation, FreeMode]}
      className="mySwiper"
      style={{ paddingBottom: 50 }}
    >
      {loading
        ? Array(4).map((i) => (
            <SwiperSlide key={i}>
              <Loading />
            </SwiperSlide>
          ))
        : hotBrand.map((item, index) => {
            return (
              <SwiperSlide className={styles.swiper_slide} key={index}>
                <Product item={item} />
              </SwiperSlide>
            );
          })}
    </Swiper>
  ) : (
    <Typography variant={"subtitle2"}>There is new product</Typography>
  );
}
