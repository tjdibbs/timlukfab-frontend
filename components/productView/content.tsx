"use client";

import React from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";

import { useForm } from "react-hook-form";
import { Product } from "@lib/types";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { updateCarts } from "@lib/redux/cartSlice";
import { nanoid } from "nanoid";
import ProductAction from "./ProductAction";
import { marked } from "marked";
import useShop from "@hook/useShop";
import { useRouter } from "next/navigation";

export type State = {
  quantity: string | number;
  size: number | string;
  color: string;
};

function ProductContent(props: { product: Product }) {
  const { product } = props;
  const { cart, user } = useAppSelector((state) => state.shop);
  const router = useRouter();

  const [showError, setShowError] = React.useState<boolean>(false);

  const { handleCartChange } = useShop(props.product);
  const { register, watch, setValue, reset, getValues } = useForm<State>();
  const { quantity, size, color } = watch();

  const inCart = cart.findIndex((cart) => cart.product?.id === product.id);

  React.useEffect(() => {
    reset({
      quantity: inCart !== -1 ? cart[inCart].quantity : 1,
      // size: JSON.parse(product.sizes)[0],
      // color: JSON.parse(product.colors)[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleState = (name: keyof State, n: number | string) => {
    switch (name) {
      case "quantity":
        if (
          (quantity == 1 && n == -1) ||
          (quantity === product!.stock && n === 1)
        ) {
          setShowError(true);
          return;
        }
        setValue(name, parseInt(quantity as string) + (n as number));
        break;
      default:
        setValue(name, n);
    }

    cartChange();
  };

  const cartChange = () => {
    if (inCart === -1) return;
    handleCartChange({
      sizes: [size],
      colors: [color],
      quantity: parseInt(quantity as string),
    });
  };

  const productColors = JSON.parse(product.colors) as { [x: string]: boolean };
  const productSizes = JSON.parse(product.sizes) as { [x: string]: boolean };

  return (
    <div className="product-content sm:shadow-lg sm:w-full rounded-lg sm:px-2 sm:p-4 relative">
      {product.discountPercentage ? (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color={"primary"}>
            <b style={{ fontSize: "1.17em" }}>₦</b>
            {Math.floor(
              (product.price as number) -
                ((product.price as number) * product.discountPercentage) / 100
            ).toLocaleString("en")}
          </Typography>
          <Typography variant="caption" sx={{ textDecoration: "line-through" }}>
            ₦{product.price.toLocaleString("en")}
          </Typography>
          <small> - discount {product.discountPercentage}%</small>
        </Box>
      ) : (
        <Typography variant="subtitle1" fontWeight={800} color={"primary"}>
          <b style={{ fontSize: "1.17em" }}>₦</b>
          {product.price.toLocaleString("en")}
        </Typography>
      )}
      <Box className="tags" mt={1}>
        <Stack direction="row" spacing={2}>
          {product.category.split(",").map((tag: string) => {
            return (
              <Chip
                label={tag}
                key={tag}
                size="small"
                onClick={() => router.push("/category/" + tag)}
              />
            );
          })}
        </Stack>
      </Box>

      <div className="description-wrap my-4">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: marked.parse(product.description),
          }}
        />
      </div>
      <div className="colors my-3">
        <p className="font-bold text-sm">Colors</p>
        <div className="flex gap-3 flex-wrap">
          {Object.keys(productColors).map((c: string) => {
            return (
              <Chip
                label={c}
                key={c}
                style={{ background: color }}
                onClick={() => {
                  handleState("color", c);
                  cartChange();
                }}
                variant={color == c ? "filled" : "outlined"}
              />
            );
          })}
        </div>
        {!Object.keys(productColors).length && (
          <Typography variant="caption">
            Find available color from product images
          </Typography>
        )}
      </div>
      <Box className="sizes" my={2}>
        <p className="font-bold text-sm mb-2">Sizes</p>
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {Object.keys(productSizes).map((_size) => {
            return (
              <Chip
                label={_size}
                key={_size}
                size="small"
                disabled={!productSizes[_size]}
                className={
                  size === _size
                    ? "bg-slate-600 text-white hover:bg-slate-800"
                    : ""
                }
                onClick={() => {
                  handleState("size", _size);
                  cartChange();
                }}
                variant={size === _size ? "filled" : "outlined"}
              />
            );
          })}
        </Stack>
        {!Object.keys(productSizes).length && (
          <Typography variant="caption">
            This product does not have sizes
          </Typography>
        )}
      </Box>
      <Box className="quantity mt-10">
        <TextField
          size={"small"}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-input": { textAlign: "center" },
          }}
          min={2}
          id="quantity"
          {...register("quantity", {
            required: true,
            onChange: (e) => {
              let value = e.target.value;
              if (!/^\d+$/.test(value) || value.length > 2) {
                setValue("quantity", quantity);
                if (value && value !== quantity) cartChange();
              }
            },
          })}
          autoComplete={"off"}
          InputProps={{
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
          label="Quantity"
          helperText={
            product.stock -
            product.sold -
            parseInt(quantity as string) +
            " will remain in the store"
          }
        />
        <div className="helper-text mt-2">
          {showError && (
            <small className="text-red-700">
              Quantity ({product.stock - product.sold}) can not be more than
              what is available in store, to get more; contact us.
            </small>
          )}
        </div>
      </Box>
      <ProductAction {...{ product, getValues }} />
    </div>
  );
}

export default ProductContent;
