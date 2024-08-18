import React from "react";
import { NextPage } from "next";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Filter, { FilterComponentLoader } from "@comp/filter";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { AppState, Product } from "@lib/types";
import RenderProducts, { ProductsLoader } from "@comp/renderProducts";
import SEO from "@comp/seo";
import Viewed from "@comp/viewed";
import axios from "axios";
import { BASE_URL, Events } from "@lib/constants";
import { useRouter } from "next/router";
import useMessage from "@hook/useMessage";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import { emitCustomEvent } from "react-custom-events";

type Props = Partial<{
  products: Product[];
  error: boolean;
  message: string;
  // user: AppState["user"];
}>;

const pageDescription = {
  title: "Pauloxuries Wears Collection",
  description:
    "Having a collection of fashion wears from variety of brands. Find unique wears to make you stand out. We provide everything fashion",
  url: "/collections",
  image: "/identity/logo.png",
};

const Collections: NextPage<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const { alertMessage } = useMessage();

  const router = useRouter();
  const { shop_by, name } = router.query;

  React.useEffect(() => {
    if (!router.isReady) return;

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
  }, [alertMessage, shop_by, name, router]);

  React.useEffect(() => {
    const handler = (pathname: string, option: { shallow: boolean }) => {
      if (pathname.includes("collections")) setLoading(true);
    };

    router.events.on("beforeHistoryChange", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
    };
  }, [router]);

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
    <React.Fragment>
      <SEO {...pageDescription} />
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
              onClick={() => (shop_by ? router.back() : router.reload())}
            >
              {shop_by ? "Go back" : " Reload Page"}
            </Button>
          </div>
        )}

        {!loading && <Viewed />}
      </Container>
    </React.Fragment>
  );
};

export default Collections;
