import React from "react";
import { useForm } from "react-hook-form";
import { CartInterface, Product } from "@lib/types";
import { AnimatePresence, motion } from "framer-motion";

// components
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";

// hooks
import { useRouter } from "next/router";

// state management
import { useAppSelector } from "@lib/redux/store";

// icons
import Add from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import useShop from "@hook/useShop";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";

type State = { quantity: string | number; size: number };

function CheckoutInterface({ cart }: { cart: CartInterface }) {
  const { register, watch, setValue } = useForm<State>({
    defaultValues: {
      quantity: cart.quantity,
    },
  });

  const [message, setMessage] = React.useState<{ text: string; open: boolean }>(
    { text: "", open: false }
  );
  const { quantity } = watch();
  const { user, wishlist } = useAppSelector((state) => state.shop);

  const { handleRemoveCart, handleWish, handleCartChange } = useShop(
    cart["product"] as Product
  );
  const router = useRouter();
  let timeout = React.useRef<NodeJS.Timeout>();

  const inWishlist = wishlist.includes(cart.product!.id!);

  const handleState = (name: keyof State, n: number) => {
    if (name === "quantity" && quantity === 1 && n === -1) {
      clearTimeout(timeout.current);
      setMessage({
        text: "Quantity most be 1 or higher",
        open: true,
      });
      return;
    } else if (quantity === cart.product!.stock && n === 1) {
      clearTimeout(timeout.current);
      setMessage({
        text: "Your quantity is higher than what is in store",
        open: true,
      });
      return;
    }

    setValue(name, parseInt(quantity as string) + n);
    handleCartChange({
      quantity: parseInt(quantity as string) + n,
    });
  };

  React.useEffect(() => {
    if (message.open) {
      timeout.current = setTimeout(() => {
        setMessage({ ...message, open: false });
      }, 1500);
    }

    () => clearTimeout(timeout.current);
  }, [message]);

  let { price, discountPercentage } = cart.product as Product;
  const cartTotalPrice =
    (price as number) * cart.quantity! -
    (price as number) * (discountPercentage / 100);

  return (
    <div className="card bg-white/70 backdrop-blur relative">
      <div className="flex gap-2 items-center p-2">
        <Avatar
          variant={"rounded"}
          src={
            "https://pauloxuries.com/images/products/" +
            cart.product!.image?.replaceAll('"', "")
          }
        >
          <ShoppingCartCheckoutIcon />
        </Avatar>
        <span className="flex-grow font-semibold overflow-hidden text-ellipsis">
          {cart.product!.title}
        </span>
        <Chip
          label={cart.product?.stock! - cart.product!.sold! + " in stock"}
        />
      </div>
      <div className="card-content px-2 my-5">
        <div className="flex justify-between items-center">
          <TextField
            label={"Quantity"}
            {...register("quantity", {
              onChange: (e) => {
                if (!e.target.value) setValue("quantity", 1);
                handleCartChange({ quantity: parseInt(e.target.value) });
              },
              max: cart.product!.stock,
              value: cart.quantity as unknown as string,
            })}
            size={"small"}
            sx={{
              width: 130,
              "& .MuiOutlinedInput-input": { textAlign: "center" },
            }}
            InputProps={{
              // eslint-disable-next-line react/jsx-no-undef
              startAdornment: (
                <IconButton
                  size={"small"}
                  sx={{ width: "30px" }}
                  onClick={() => handleState("quantity", -1)}
                >
                  &minus;
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  size={"small"}
                  onClick={() => handleState("quantity", 1)}
                >
                  <Add fontSize={"small"} />
                </IconButton>
              ),
            }}
          />
          <Box>
            <span className="text-sm font-bold mr-2 text-primary-low">
              #{cartTotalPrice.toLocaleString("en")} -
            </span>
            <span className="text-xs">
              #{cart.product!.price?.toLocaleString("en")} per 1 item
            </span>
          </Box>
        </div>
      </div>
      <div className="flex gap-x-3 px-2 items-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleRemoveCart}
          className="btn text-sm bg-primary-low text-white"
        >
          Remove
        </motion.button>
        <Button
          size={"small"}
          color={"warning"}
          variant={"outlined"}
          sx={{ textTransform: "none" }}
          onClick={() =>
            router.push(
              "/products?p=" + cart.product!.title + "&id=" + cart.product!.id
            )
          }
        >
          View
        </Button>
        <div className="wish flex-grow flex justify-end">
          <IconButton className="bg-white shadow-lg" onClick={handleWish}>
            {inWishlist ? (
              <Favorite className="text-primary-low" />
            ) : (
              <FavoriteBorderOutlined className="text-primary-low" />
            )}
          </IconButton>
        </div>
      </div>
      <AnimatePresence>
        {message.open && (
          <motion.div
            initial={{ bottom: -10, opacity: 0.6 }}
            animate={{ bottom: 10, opacity: 1 }}
            exit={{ bottom: -10, opacity: 0 }}
            className="absolute left-1/2 transition-all -translate-x-1/2 text-sm w-max bg-red-700 px-4 py-2 text-white rounded-full shadow-lg"
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(CheckoutInterface);
