import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductStyle2 from "../productStyle2";
import { Product } from "@lib/types";
import axios from "axios";
import { useSnackbar } from "notistack";
import Loading from "../loading";
import AliceCarousel from "react-alice-carousel";
import { Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { BASE_URL, breakpoints } from "@lib/constants";
import useMessage from "@hook/useMessage";
import { nanoid } from "nanoid";
import { useAppSelector } from "@lib/redux/store";

const responsive = {
  0: { items: 2 },
  568: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
};

export default function TopProducts() {
  const [topProducts, setTopProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { alertMessage } = useMessage();

  const { cart, wishlist, user } = useAppSelector((state) => state.shop);

  React.useEffect(() => {
    axios
      .get<{ success: boolean; products: Product[] }>(
        BASE_URL + "/api/products/top"
      )
      .then((response) => {
        const { success, products } = response.data;
        if (success) {
          setTopProducts(products);
          setLoading(false);
        } else alertMessage("Internal Server Error", "error");
      })
      .catch(() => {
        alertMessage("There is problem fetching search products", "error");
      });
  }, [alertMessage]);

  return (
    <Box sx={{ flexGrow: 1, my: 5 }}>
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
          : topProducts.map((product) => {
              const inCart = cart.findIndex(
                (cart) => cart.product!.id === product.id
              );
              const inWishlist = wishlist.includes(product.id);

              return (
                <SwiperSlide key={product.id}>
                  <ProductStyle2
                    item={product}
                    {...{ inCart, inWishlist }}
                    component="div"
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </Box>
  );
}

// export const itemData = [
//   {
//     _id: "1",
//     img: "/images/daco.png",
//     title: "Doco Image",
//     description: "from chicago",
//     price: 140300,
//   },
//   {
//     _id: "2",
//     img: "/images/female-shoe.png",
//     title: "Ladies Shoes",
//     description: "from chicago",
//     price: 140300,
//   },
//   {
//     _id: "3",
//     img: "/images/daco.png",
//     title: "Doco Image",
//     description: "from chicago",
//     price: 140300,
//   },
//   {
//     _id: "4",
//     img: "/images/daco.png",
//     title: "Ladies Shoes",
//     description: "from chicago",
//     price: 140300,
//   },
// ];
