"use client";

import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import Link from "next/link";
import ShippingSummary from "@comp/checkout/summary";
import Information from "@comp/checkout/information";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import Cookie from "js-cookie";
import { AppState, CheckoutInterface, CartInterface } from "@lib/types";
import ShopStepper from "@comp/ShopStepper";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import dynamic from "next/dynamic";

const Checkout: React.FC<{ user?: AppState["user"] }> = ({ user }) => {
  const theme = useTheme();

  const checkoutCookie = Cookie.get("checkout");
  const checkout: CheckoutInterface<CartInterface> = checkoutCookie
    ? JSON.parse(checkoutCookie)
    : null;

  return (
    <React.Fragment>
      <Container
        maxWidth={"xl"}
        sx={{ mb: 10, p: 0 }}
        className="component-wrap"
      >
        <Box className={"breadcrumbs-wrapper"} my={3}>
          <BreadcrumbComp links={links} />
        </Box>
        {checkout && <ShopStepper completed={[0]} activeStep={1} />}
        <div className="title text-xl font-extrabold my-5">Checkout</div>
        {checkout && (
          <Box
            className={"wrapper mt-5"}
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Information checkout={checkout} />
            <ShippingSummary checkout={checkout} />
          </Box>
        )}
        {!checkout && <CartEmpty />}
      </Container>
    </React.Fragment>
  );
};

const CartEmpty = () => (
  <div className="card w-full p-4">
    <Typography variant={"subtitle2"} my={2}>
      There is no product to checkout
    </Typography>
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
);

const links = [
  {
    label: "home",
    path: "/",
  },
  {
    label: "checkout",
    path: "#",
    disabled: true,
  },
  {
    label: "information",
  },
];

// export default Checkout;

export default dynamic(async () => await Checkout, { ssr: false });
