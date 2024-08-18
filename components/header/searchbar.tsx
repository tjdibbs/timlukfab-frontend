import React, { SetStateAction } from "react";
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
import { useRouter } from "next/router";
import { BASE_URL } from "@lib/constants";
import { Spin } from "antd";
import { useAppSelector } from "@lib/redux/store";
import Image from "next/image";

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
  const router = useRouter();

  const { cart, wishlist } = useAppSelector((state) => state.shop);

  const handleSearch = async (search: string) => {
    try {
      if (!search) {
        setProduct([]);
        return;
      }
      setLoading(true);
      const req = await axios.get<{ success: boolean; products: Product[] }>(
        BASE_URL + "/api/products/search?s=" + search
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

  React.useEffect(() => {
    if (open) document.body.classList.add("searching");
    else document.body.classList.remove("searching");

    router.events.on("routeChangeStart", () => setOpenSearch(false));

    return () => {
      router.events.off("routeChangeStart", () => setOpenSearch(false));
      document.body.classList.remove("searching");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence exitBeforeEnter={true} initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed h-screen top-0 left-0 w-screen bg-black/80 flex items-center z-[10000]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
            }}
            className="max-w-[90%] h-max max-h-[90%] overflow-auto m-auto w-[700px] bg-white rounded-xl"
            exit={{ scale: 0 }}
          >
            <Paper
              elevation={0}
              component={"form"}
              className="sticky py-3 top-0 z-10 px-5"
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
                          (cart) => cart.product!.id === item.id
                        );
                        const inWishlist = wishlist.includes(item.id);

                        return (
                          <Grid item xs={6} sm={4} key={index}>
                            <ProductStyle2
                              component={"div"}
                              {...{ inCart, inWishlist, item }}
                            >
                              <div className="h-[200px] sm:h-[250px] relative">
                                <Image
                                  src={
                                    "https://pauloxuries.com/images/products/" +
                                    JSON.parse(item.images)[0]
                                  }
                                  loading="lazy"
                                  alt={item.title}
                                  fill
                                  className={`w-full object-fill  pointer-events-none`}
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
                <div className="w-screen h-[150px] grid place-items-center">
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
