"use client"

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Box,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import React from "react";
import {
  CheckoutInterface,
  CartInterface,
  OrderType,
  Product,
} from "@lib/types";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import axios from "axios";
import { useSnackbar } from "notistack";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export interface Prop extends Omit<OrderType, "checkout"> {
  id: string;
  delivered: boolean;
  checkout: string;
  cancelled: boolean;
  revoked: string;
}

export default function Order(prop: Prop) {
  const checkouts = JSON.parse(
    prop.checkout
  ) as CheckoutInterface<CartInterface>;
  const { mode, user } = useAppSelector((state) => state.shop);
  const [expand, setExpand] = React.useState<boolean>(false);
  const [revoked, setRevoked] = React.useState<string[]>(
    JSON.parse(prop.revoked ?? [])
  );
  const [cancelled, setCancelled] = React.useState(prop.cancelled);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card sx={{ borderRadius: "20px", p: 1, mb: 1 }}>
      <CardHeader
        title={prop.id}
        avatar={
          <Tooltip title={"quantity of products ordered"}>
            <Avatar sx={{ fontWeight: 700, bgcolor: "primary.main" }}>
              {checkouts.cart.length}
            </Avatar>
          </Tooltip>
        }
        action={
          <IconButton size="small" onClick={() => setExpand(!expand)}>
            <KeyboardArrowDownRoundedIcon
              style={{
                transform: `rotateZ(${expand ? "180deg" : "0deg"})`,
                transition: "all 0.20s ease-in-out",
              }}
            />
          </IconButton>
        }
      />
      <Collapse in={expand}>
        {checkouts.cart.map((checked, index) => {
          return (
            <Card
              key={index}
              sx={{
                borderRadius: "20px",
                p: 1,
                mb: 1,
                bgcolor: mode === "light" ? "#f2f2f2" : "#050505",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ borderRadius: "5px!important" }}
                    variant={"rounded"}
                    src={"/images/products/" + checked.product!?.image}
                  >
                    <ShoppingCartCheckoutIcon />
                  </Avatar>
                }
                title={
                  <Typography
                    variant={"body1"}
                    fontWeight={600}
                    lineHeight={1.3}
                  >
                    {checked.product!.title}
                  </Typography>
                }
                action={<Chip label={checked.quantity} />}
              />
              <CardContent>
                <Stack
                  direction={"row"}
                  gap={3}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"}>
                    <Chip
                      label={checked.product.discountPercentage + "% discount"}
                    />
                  </Stack>
                  <Box>
                    <Typography
                      variant={"subtitle1"}
                      fontWeight={800}
                      color={"primary"}
                    >
                      #
                      {(
                        (checked.product!.price as number) * checked.quantity
                      ).toLocaleString("en")}
                    </Typography>
                    <Typography variant={"caption"} color={"text.secondary"}>
                      #{checked.product?.price!.toLocaleString("en")} per 1 item
                    </Typography>
                  </Box>
                  {!revoked?.includes(checked.product.id as string) &&
                  !cancelled ? (
                    <Button
                      size="small"
                      color="warning"
                      variant="outlined"
                      onClick={async () => {
                        let req = await axios.delete("/api/order/cancel", {
                          data: {
                            order_id: prop.id,
                            revoked: [checked.product.id],
                            products: [checked],
                            user: {
                              firstname: user!.firstname,
                              lastname: user!.lastname,

                              email: user!.email,
                            },
                          },
                        });

                        let res = await req.data;
                        if (res.success) {
                          setRevoked([
                            ...revoked,
                            checked.product.id as string,
                          ]);
                        } else {
                          enqueueSnackbar(
                            "Unable to cancel order, contact support",
                            { variant: "error" }
                          );
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Typography color="text.secondary">Cancelled</Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Collapse>
      <Stack justifyContent={"flex-end"} spacing={2} direction="row">
        <Chip
          color={!prop.delivered ? "warning" : "success"}
          label={
            prop.delivered
              ? cancelled
                ? "cancelled"
                : "delivered"
              : cancelled
              ? "cancelled"
              : "pending"
          }
          disabled={Boolean(cancelled)}
          sx={{ color: "#fff" }}
        />

        {!prop.delivered && !cancelled && (
          <Button
            variant={"outlined"}
            onClick={async () => {
              let req = await axios.delete("/api/order/cancel", {
                data: {
                  order_id: prop.id,
                  all: true,
                  user: {
                    firstname: user!.firstname,
                    lastname: user!.lastname,
                    id: user!.id,
                  },
                  products: checkouts.cart,
                },
              });

              let res = await req.data;
              console.log({ res });
              if (res.success) {
                setCancelled(true);
              } else {
                enqueueSnackbar("Unable to cancel order, contact support", {
                  variant: "error",
                });
              }
            }}
          >
            {" "}
            Cancel Order{" "}
          </Button>
        )}
      </Stack>
    </Card>
  );
}
