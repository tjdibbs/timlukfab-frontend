"use client";

import React, { SetStateAction, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ProductStyle2 from "../productStyle2";
import { Product } from "@lib/types";
import axios from "axios";
import { useSnackbar } from "notistack";
import { BASE_URL } from "@lib/constants";
import { Spin } from "antd";
import { useAppSelector } from "@/lib/_redux/store";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SearchBar: React.FC<{
  open: boolean;
  setOpenSearch: React.Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpenSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<Product[]>([]);
  const pathname = usePathname();

  const { cart, wishlist } = useAppSelector((state) => state.shop);

  const handleSearch = async (search: string) => {
    try {
      if (!search) {
        setProduct([]);
        return;
      }
      setLoading(true);
      const req = await axios.get<{ success: boolean; products: Product[] }>(
        BASE_URL + "/api/products/search?s=" + search,
      );
      const { success, products } = await req.data;
      if (success) {
        setProduct(products);
        setLoading(false);
        return;
      }

      enqueueSnackbar("Internal Server Error", {
        variant: "error",
      });
      setLoading(false);
    } catch (e) {
      enqueueSnackbar("There is problem fetching search products", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("searching");
    } else {
      document.body.classList.remove("searching");
    }

    return () => {
      document.body.classList.remove("searching");
    };
  }, [open]);

  useEffect(() => {
    setOpenSearch(false);
  }, [pathname, setOpenSearch]);

  return (
    <AnimatePresence exitBeforeEnter={true} initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-[10000] flex h-screen w-screen items-center bg-black/80"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
            }}
            className="m-auto h-max max-h-[90%] w-[700px] max-w-[90%] overflow-auto rounded-xl bg-white"
            exit={{ scale: 0 }}
          >
            <Paper
              elevation={0}
              component={"form"}
              className="sticky top-0 z-10 px-5 py-3"
            >
              <TextField
                size={"small"}
                label={"Brand, product, class"}
                fullWidth
                autoFocus={true}
                sx={{ flexGrow: 1 }}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <IconButton
                        size={"small"}
                        sx={{
                          bgcolor: "background.main",
                        }}
                        onClick={() => {
                          setOpenSearch(false);
                          setProduct([]);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
            <div className={"search-bar-wrapper overflow-hidden"}>
              {!loading && Boolean(product?.length) && (
                <React.Fragment>
                  <Typography variant={"subtitle1"} textAlign={"center"} mb={2}>
                    Search Results
                  </Typography>
                  <motion.div
                    layout
                    className={"search-result p-4"}
                    style={{
                      paddingBottom: "2em",
                    }}
                  >
                    <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ px: 1 }}>
                      {product.map((item, index) => {
                        const inCart = cart.findIndex(
                          (cart) => cart.product!.id === item.id,
                        );
                        const inWishlist = wishlist.includes(item.id);

                        return (
                          <Grid item xs={6} sm={4} key={index}>
                            <ProductStyle2
                              component={"div"}
                              {...{ inCart, inWishlist, item }}
                            >
                              <div className="relative h-[200px] sm:h-[250px]">
                                <Image
                                  src={
                                    "https://pauloxuries.com/images/products/" +
                                    JSON.parse(item.images)[0]
                                  }
                                  loading="lazy"
                                  alt={item.title}
                                  fill
                                  className={`pointer-events-none w-full object-fill`}
                                />
                              </div>
                            </ProductStyle2>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </motion.div>
                </React.Fragment>
              )}

              {loading && (
                <div className="grid h-[150px] w-screen place-items-center">
                  <Spin />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
