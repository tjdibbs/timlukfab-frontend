import { useCustomEventListener } from "react-custom-events";
import { Product } from "@lib/types";
import React from "react";
import { Box, Grid, Pagination } from "@mui/material";
import ProductStyle2 from "./productStyle2";
import { motion } from "framer-motion";
import { sort } from "./filter";
import { useAppSelector } from "@lib/redux/store";
import Loading from "@comp/loading";
import SortFunc from "@helper/sort";
import { Events } from "@lib/constants";
import { useRouter } from "next/router";

const RenderProducts = (props: { products: Product[] }) => {
  const router = useRouter();
  const [filterProducts, setFilterProducts] = React.useState<Product[]>(
    props.products ?? []
  );

  const [page, setPage] = React.useState(1);
  const [sortValue, setSortValue] = React.useState<keyof typeof sort>("FE");
  const productsContainerRef = React.useRef<HTMLDivElement>(null);
  const { cart, wishlist, user } = useAppSelector((state) => state.shop);

  useCustomEventListener(
    Events.FILTERED,
    (products: Product[]) => {
      setFilterProducts(products);
      setPage(1);
    },
    []
  );

  useCustomEventListener(Events.SORT, setSortValue, []);
  useCustomEventListener(Events.NEW_PRODUCTS, setFilterProducts, []);

  React.useEffect(() => {
    setFilterProducts(SortFunc.bind({ sortValue }));
  }, [sortValue]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    productsContainerRef.current?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
    setPage(value);
  };

  const count =
    filterProducts.length % 12 === 0
      ? filterProducts.length / 12
      : Math.floor(filterProducts.length / 12) + 1;

  if (!filterProducts?.length) return <></>;

  return (
    <React.Fragment>
      <div className="products flex-grow my-5" ref={productsContainerRef}>
        <Grid container spacing={1}>
          {filterProducts
            .slice((page - 1) * 12, 12 * page)
            .map((product, index) => {
              const inCart = cart.findIndex(
                (cart) => cart.product!.id === product.id
              );
              const inWishlist = wishlist.includes(product.id);
              return (
                <ProductStyle2
                  key={index}
                  item={product}
                  {...{ inCart, inWishlist }}
                />
              );
            })}
        </Grid>
        {!Boolean(filterProducts.length) && (
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="card mt-10"
          >
            <div className="text font-bold text-center">
              No product matched the selected filter option
            </div>
          </motion.div>
        )}
      </div>
      <Box className="pagination-wrapper w-max m-auto my-5 rounded-lg p-4">
        <Pagination
          count={count}
          page={page}
          size={"small"}
          variant={"outlined"}
          onChange={handleChange}
        />
      </Box>
    </React.Fragment>
  );
};

export const ProductsLoader = () => (
  <Grid container spacing={1}>
    {Array.from(new Array(4)).map((_, index) => (
      <Loading key={index} />
    ))}
  </Grid>
);

export default RenderProducts;
