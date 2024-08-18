import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Pagination,
  Typography,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { AppState, Product } from "@lib/types";
import { useRouter } from "next/router";
import RenderProducts from "@comp/renderProducts";
import Filter from "@comp/filter";
import FetchCartsHook from "@comp/fetchCartsHook";
import SEO from "@comp/seo";
import axios from "axios";

type Props = Partial<{
  products: string;
  error: boolean;
  message: string;
  user: AppState["user"];
}>;

const Collections: React.FC<Props> = (props) => {
  const [products, setProducts] = React.useState<Product[]>(
    JSON.parse(props.products ?? "[]") ?? []
  );
  const router = useRouter();

  React.useEffect(() => {
    setProducts(JSON.parse(props.products ?? "[]") ?? []);
  }, [props]);

  if (props.error) {
    return (
      <React.Fragment>
        <Container sx={{ p: 0 }}>
          <Paper sx={{ p: 3, my: 3 }}>
            <Typography variant={"subtitle2"} my={2}>
              Internal Server Error Occur
            </Typography>
            <Button
              variant={"contained"}
              sx={{ textTransform: "none" }}
              onClick={() => window?.location.reload()}
            >
              Reload Page
            </Button>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }

  FetchCartsHook({
    user: props.user,
    loading: false,
    setLoading: () => null,
  });

  const pageDescription = {
    title: `Products from ${router.query.name} ${router.query.shop_by}`,
    description:
      "Brands and Categories of product we have in the store. Get the best fit by category or your favorite brand with their verified products.",
    url:
      "https://pauloxuries.com/" +
      `${router.query.shop_by}/${router.query.name}/`,
    image: "https://pauloxuries.com/identity/dark-logo.png",
  };

  return (
    <React.Fragment>
      <SEO {...pageDescription} />
      <Container maxWidth={"xl"} sx={{ p: 0 }} className="component-wrap">
        <Box className={"breadcrumbs-wrapper"} my={3}>
          <Breadcrumbs
            separator={<ArrowForwardIosRounded sx={{ fontSize: 11 }} />}
          >
            <Link href={"/"}>
              <Typography sx={{ cursor: "pointer" }} variant={"subtitle2"}>
                Home
              </Typography>
            </Link>
            <Link href={"/collections"}>
              <Typography variant={"subtitle2"}>Collections</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
        <Box className="filter-wrapper">
          <Filter products={products} />
          <Divider />
        </Box>
        <Box mt={2}>
          <Typography component={"span"} variant={"subtitle2"}>
            Product {router.query.shop_by} :{" "}
          </Typography>
          <Typography
            component={"span"}
            fontWeight={800}
            textTransform={"capitalize"}
            variant={"h6"}
          >
            {router.query.name}
          </Typography>
        </Box>
        {products.length > 0 ? (
          <RenderProducts products={products} />
        ) : (
          <div className="p-5 mt-4 bg-primary-low/10 rounded-lg shadow-lg">
            <p className="text-sm font-bold mb-4">
              This {router.query.shop_by} products is out of stock
            </p>
            <button
              type="button"
              className="bg-primary-low rounded-lg px-4 p-1.5 text-sm shadow-lg text-white"
              onClick={router.back}
            >
              Go back
            </button>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Collections;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     //@ts-ignore
//     const user = ctx.req.session.user ?? null;
//     const { shop_by, name } = ctx.query as { shop_by: string; name: string };

//     const findQuery = `SELECT id,stock,category,brand,price,title,discountPercentage,rating,images FROM Product WHERE ${shop_by} REGEXP '${name}' LIMIT 12`;
//     const products = (await client.query(findQuery))[0] as Product[];

//     return {
//       props: {
//         user,
//         products: JSON.stringify(products ?? "[]"),
//       },
//     };
//   } catch (e: any) {
//     return {
//       props: {
//         error: true,
//         message: e.message,
//       },
//     };
//   }
// };
