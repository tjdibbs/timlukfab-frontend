"use client";

import React from "react";
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
import RenderProducts from "@comp/renderProducts";
import Filter from "@comp/filter";
import FetchCartsHook from "@comp/fetchCartsHook";
import axios from "axios";
import type { Product as PType } from "@lib/types";
import { useRouter } from "next/navigation";

type Props = Partial<{
  products: PType[];
  error: boolean;
  message: string;
  user: AppState["user"];
  shop_by: string;
  name: string;
}>;

const Name: React.FC<Props> = ({
  products = [],
  error,
  user,
  name,
  shop_by,
}) => {
  const router = useRouter();

  if (error) {
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
    user: user,
    loading: false,
    setLoading: () => null,
  });

  return (
    <React.Fragment>
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
            Product {shop_by} :{" "}
          </Typography>
          <Typography
            component={"span"}
            fontWeight={800}
            textTransform={"capitalize"}
            variant={"h6"}
          >
            {name}
          </Typography>
        </Box>
        {products.length > 0 ? (
          <RenderProducts products={products} />
        ) : (
          <div className="p-5 mt-4 bg-primary-low/10 rounded-lg shadow-lg">
            <p className="text-sm font-bold mb-4">
              This {shop_by} products is out of stock
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

export default Name;

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
