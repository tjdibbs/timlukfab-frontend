"use client";

import { Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Filter, { FilterComponentLoader } from "@comp/filter";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { AppState, Product } from "@lib/types";
import RenderProducts, { ProductsLoader } from "@comp/renderProducts";
import Viewed from "@comp/viewed";
import axios from "axios";
import { BASE_URL, Events } from "@lib/constants";
import useMessage from "@hook/useMessage";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import { emitCustomEvent } from "react-custom-events";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = Partial<{
  products: Product[];
  error: boolean;
  message: string;
  // user: AppState["user"];
}>;

const Collections = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { alertMessage } = useMessage();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shop_by = searchParams?.get("shop_by");
  const name = searchParams?.get("name");

  useEffect(() => {
    (async () => {
      try {
        let endpoint =
          "/api/products" + (shop_by && name ? `/${shop_by}/${name}` : "");
        const getProducts = await axios.get(BASE_URL + endpoint);
        const { success, products } = await getProducts.data;

        if (success && products) setProducts(products);

        // trigger this event to force update some child components
        emitCustomEvent(Events.NEW_PRODUCTS, products);
      } catch (e: any) {
        console.log({ e });
        alertMessage(
          "We are having issue getting products from server",
          "error"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [alertMessage, shop_by, name]);

  useEffect(() => {
    if (pathname?.includes("collections")) {
      setLoading(true);
    }
  }, [pathname, setLoading]);

  const links = [
    {
      path: "/",
      label: "home",
    },
    {
      path: "/collections",
      label: "collections",
    },
    ...(shop_by
      ? [
          { label: shop_by as string, disabled: true },
          { label: name as string, disabled: true },
        ]
      : []),
  ];

  return (
    <Fragment>
      <Container maxWidth={"xl"} sx={{ p: 0 }} className="component-wrap">
        <BreadcrumbComp links={links} />

        {/* Display if there shop_by query */}
        {shop_by && (
          <div className="mb-4 p-3 bg-primary-low/10 shadow-lg flex gap-x-1 rounded-lg items-center">
            <small className="">Products {shop_by}: </small>
            <p className="font-bold capitalize">{name}</p>
          </div>
        )}

        <Box className="filter-wrapper">
          {loading ? <FilterComponentLoader /> : <Filter {...{ products }} />}
        </Box>

        {loading ? (
          <ProductsLoader />
        ) : (
          !!products.length && <RenderProducts {...{ products }} />
        )}

        {!loading && !products.length && (
          <div className={"card bg-primary-low/10"}>
            <Typography variant={"subtitle1"} mb={2}>
              {shop_by ? (
                <span>
                  <b className="capitalize">{name}</b> wears is not available in
                  the store
                </span>
              ) : (
                "Error fetching products"
              )}
            </Typography>
            <Button
              variant={"contained"}
              size={"small"}
              className="bg-primary-low"
              onClick={() => (shop_by ? router.back() : router.refresh())}
            >
              {shop_by ? "Go back" : " Reload Page"}
            </Button>
          </div>
        )}

        {!loading && <Viewed />}
      </Container>
    </Fragment>
  );
};

export default Collections;
