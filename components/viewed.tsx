import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import ProductStyle2 from "./productStyle2";
import { Product } from "@lib/types";
import axios from "axios";
import { useSnackbar } from "notistack";
import Loading from "./loading";
import AliceCarousel from "react-alice-carousel";
import { Divider, Typography } from "@mui/material";
import { breakpoints } from "@lib/constants";
import { Swiper, SwiperSlide } from "swiper/react";

const responsive = {
  0: { items: 2 },
  568: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
};

export default function Viewed({ id }: { id?: string }) {
  const [viewed, setViewed] = React.useState<Product[]>(
    JSON.parse(Cookies.get("viewed") ?? "[]")
  );

  if (!viewed.length) return <></>;

  return (
    <Box sx={{ flexGrow: 1, my: 5 }}>
      <Box my={4}>
        <Divider>
          <Typography variant="h6">What you recently view</Typography>
        </Divider>
      </Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={breakpoints}
        className="px-2 py-6"
      >
        {viewed.map((product, index) => (
          <SwiperSlide key={product.id}>
            <ProductStyle2
              item={product}
              component="div"
              inCart={0}
              inWishlist={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
