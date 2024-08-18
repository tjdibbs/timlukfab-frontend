import React from "react";
import Box from "@mui/material/Box";
import ProductStyle2 from "@comp/productStyle2";
import { Product } from "@lib/types";
import axios from "axios";
import Loading from "@comp/loading";
import { SwiperSlide, Swiper } from "swiper/react";
import { BASE_URL, breakpoints } from "@lib/constants";
import useMessage from "@hook/useMessage";
import { nanoid } from "nanoid";
import { useAppSelector } from "@lib/redux/store";
import SEO from "@comp/seo";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import { Button } from "@mui/material";
import Link from "next/link";

function Wishlist() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { alertMessage } = useMessage();

  const { cart, wishlist, user } = useAppSelector((state) => state.shop);

  const pageDescription = {
    title: `${user?.firstname ?? ""} Wishlist`,
    description:
      "Get quality wears from different brands, we provide fashion combination for you, you don't have to worry about what to wear. Get yours sneakers, oversized, trousers, rugged jeans and others, for both men and women. ",
    url: "https://pauloxuries.com/",
    image: "https://pauloxuries.com/identity/dark-logo.png",
  };

  console.log({ wishlist });

  React.useEffect(() => {
    if (!wishlist?.length) {
      setLoading(false);
      return;
    }

    axios
      .post<{ success: boolean; products: Product[] }>(
        BASE_URL + "/api/products/info",
        wishlist
      )
      .then((response) => {
        const { success, products } = response.data;
        if (success) {
          setProducts(products);
          setLoading(false);
        } else alertMessage("Internal Server Error", "error");
      })
      .catch(() => {
        alertMessage("There is problem fetching wishlist products", "error");
      });
  }, [alertMessage, wishlist]);

  const links = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "wishlist",
    },
  ];

  return (
    <Box className="component-wrap">
      <BreadcrumbComp links={links} />
      <div className="page-title text-xl font-bold">Wishlist</div>
      <SEO {...pageDescription} />
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
          : !!products?.length &&
            products.map((product) => {
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
        {!loading && !wishlist?.length && (
          <div className="card grid place-items-center w-full mt-5">
            <p className="text-sm mb-3 font-bold">There is nothing here</p>
            <Link href={"/collections"}>
              <Button
                variant={"contained"}
                className="bg-primary-low"
                sx={{ textTransform: "none" }}
              >
                Go to shop
              </Button>
            </Link>
          </div>
        )}
      </Swiper>
    </Box>
  );
}

export default Wishlist;
