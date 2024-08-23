"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Link from "next/link";
import { Product } from "@lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/_redux/store";

// components
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import ProductContent from "@comp/productView/content";
import RelatedProduct from "@comp/productView/RelatedProducts";
import View from "@comp/productView/Images";
import Viewed from "@comp/viewed";
import axios from "axios";
import Share from "@comp/productView/Share";
import Reviews from "@comp/productView/Reviews";

// icons
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import { BASE_URL } from "@lib/constants";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import { usePathname } from "next/navigation";

type Props = {
  product: Product | null;
  notfound?: boolean;
  error: boolean;
};

const ProductPage = ({ error, product, notfound }: Props) => {
  const { cart } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  React.useEffect(() => {
    document.body.scrollTo({ top: 0 });
  }, [pathname]);

  if (error) {
    return (
      <Container sx={{ py: 5, px: 2 }}>
        <Typography>Internal Server Error: Reload Page</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 5, px: 2 }}>
        <Typography>The Product you are looking for is missing</Typography>
      </Container>
    );
  }

  const links = [
    {
      path: "/",
      label: "home",
    },
    {
      path: "/collections",
      label: "collections",
    },
    {
      path: "/",
      label: product.title,
    },
  ];

  return (
    <div className="component-wrap">
      <Box className={"breadcrumbs-wrapper"} my={3}>
        <BreadcrumbComp links={links} />
      </Box>
      <div className="main-content">
        <Box className="title" mt={2}>
          <Typography
            textTransform="capitalize"
            variant={"h6"}
            fontWeight={800}
          >
            {product.title}
          </Typography>
          <Typography variant={"caption"}>
            See more from{" "}
            <Link href={"/collections/brand/" + product.brand}>
              <span className="text-primary-low text-xs">{product.brand}</span>
            </Link>
          </Typography>
        </Box>
        <div className="my-5 md:flex">
          <div className="section-product sm:p-6 md:w-[60%]">
            <View images={JSON.parse(product.images)} alt={product.title} />
          </div>
          <ProductContent product={product} />
        </div>
      </div>
      <Box>
        <Share />
        <Box className={"description my-4"} maxWidth={"100%"}>
          <p className="mb-3 text-lg font-extrabold">Information</p>
          <div className="shipping-info-wrap">
            <h1 className="font-bold">Shipping</h1>
            <div className="text-xs">
              <span>
                Calculated at checkout{" "}
                <Link
                  href={"/shipping"}
                  style={{ color: "#660132", textDecoration: "none" }}
                  passHref
                >
                  Learn more
                </Link>{" "}
              </span>
            </div>
            <ul className="my-2">
              <li className="text-sm">Lagos: 48 – 72working hours.</li>
              <li className="text-sm">Outside Lagos: 3-7 working days.</li>
            </ul>
          </div>
        </Box>
      </Box>
      <Reviews product={product} />
      <Divider />
      <RelatedProduct
        brand={product.brand}
        category={product.category}
        title={product.title}
        id={product.id}
      />
      <Viewed id={product.id} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   res,
//   query,
// }) => {
//   try {
//     // @ts-ignore
//     const user = req.session.user ?? null;
//     const { id } = query as unknown as { id: string };

//     if (!id) {
//       return {
//         props: {
//           user,
//           notfound: true,
//         },
//       };
//     }

//     let find_query = `SELECT * FROM Product WHERE id='${id}'`;
//     const product = (await client.query(find_query))[0] as Product[];

//     return {
//       props: {
//         user,
//         product: product ? JSON.stringify(product[0]) : null,
//       },
//     };
//   } catch (e) {
//     console.log({ e });
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }
// };

export default ProductPage;
