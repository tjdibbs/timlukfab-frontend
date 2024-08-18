import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import type { AppState, CartInterface, Product } from "@lib/types";
import Checkout from "@comp/cart/checkout";
import NoCart from "@comp/cart/nocart";
import CartProduct from "@comp/cart/CartProduct";
import FetchCartsHook from "@comp/fetchCartsHook";
import axios from "axios";
import { BASE_URL } from "@lib/constants";
import { setAllCarts } from "@lib/redux/cartSlice";
import { setAllCart } from "@lib/redux/reducer";
import useMessage from "@hook/useMessage";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import ShopStepper from "@comp/ShopStepper";

interface Props {
  user: AppState["user"];
}

type DynamicResponse = { products: Product[] } | { cart: CartInterface[] };

export default function Carts(props: Props) {
  const { cart, user } = useAppSelector((state) => state.shop);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { alertMessage } = useMessage();

  const dispatch = useAppDispatch();

  const updateCartFields = React.useCallback(
    (products: CartInterface["product"][]) => {
      // after getting the updated details of the cart product,
      // we update the localCart with the detail we get from backend
      // note: cart are updated by their cart id
      let compiledCarts = products.map((productDetail) => {
        let localCart = cart.find(
          (cart) => cart.product?.id == productDetail.id
        ) as CartInterface;
        return {
          ...localCart,
          product: productDetail,
        };
      });

      dispatch(setAllCart(compiledCarts));
    },
    [cart, dispatch]
  );

  React.useEffect(() => {
    // we need to send the local cart ids to get the updated cart product details
    let local_cart_ids = cart.map(({ product }) => product?.id);
    if (!local_cart_ids?.length) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        // if user is signed in it made a get request while there is no user it made a post request
        const req = await axios[user ? "get" : "post"]<DynamicResponse>(
          BASE_URL + (user ? `/cart/` + user?.id : `/api/products/info`),
          local_cart_ids
        );

        const res = await req.data;

        // if user is signed in, it means cart is coming from the server else if the user is not signed
        // in then access the cart page the endpoint will return each cart product details which can be accessible by
        // the cart product id
        user
          ? dispatch(setAllCart((res as { cart: CartInterface[] }).cart))
          : updateCartFields((res as { products: Product[] }).products);
      } catch (e) {
        console.error({ e });
        alertMessage(
          "We are having issue communicating with the server",
          "error"
        );
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMessage, user]);

  return (
    <Container maxWidth={"xl"} sx={{ p: 0 }} className="component-wrap">
      {/*<Head>*/}
      {/*  <title>Pauloxuries - {props.user!?.firstname ?? "User"} Carts</title>*/}
      {/*</Head>*/}
      <Box my={3}>
        <BreadcrumbComp links={links} />
      </Box>
      <section className={"main-content mt-5"}>
        {Boolean(cart.length) && <ShopStepper completed={[]} activeStep={0} />}
        <h5 className="title font-extrabold text-xl mt-5 rounded-lg mb-3 w-max">
          Shopping Cart
        </h5>

        <div className="flex flex-wrap justify-end gap-3 my-5">
          {!loading ? (
            <React.Fragment>
              <div className="flex-grow flex flex-col gap-y-3">
                {cart.map((cart, index) => {
                  return (
                    <CartProduct key={index} cart={cart as CartInterface} />
                  );
                })}
              </div>
              <div className="w-full sm:w-[300px]">
                <Checkout />
              </div>
            </React.Fragment>
          ) : (
            <CartSkeleton />
          )}
        </div>
        {!loading && <NoCart cart={cart} />}
      </section>
    </Container>
  );
}

const CartSkeleton = () => (
  <React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
      {Array.from(new Array(5)).map((product, index) => {
        return (
          <div className={"card p-4 mb-4"} key={index}>
            <Skeleton
              variant={"rectangular"}
              className="w-full rounded-lg h-[30px]"
            />
            <Stack
              sx={{ mt: 3 }}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Skeleton
                variant={"rectangular"}
                width={80}
                height={30}
                sx={{ borderRadius: "20px" }}
              />
              <div>
                <Skeleton
                  variant={"rectangular"}
                  width={100}
                  height={10}
                  sx={{ mb: 1, borderRadius: "20px" }}
                />
                <Skeleton
                  variant={"rectangular"}
                  width={60}
                  height={10}
                  sx={{ borderRadius: "20px" }}
                />
              </div>
            </Stack>
          </div>
        );
      })}
    </Box>
    <div className={"card w-[300px] grid place-items-center bg-primary-low/10"}>
      <CircularProgress />
    </div>
  </React.Fragment>
);

const links = [
  {
    label: "home",
    path: "/",
  },
  {
    label: "cart",
    path: "/cart",
  },
];
