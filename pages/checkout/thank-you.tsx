import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import Link from "next/link";
import BreadcrumbComp from "@comp/BreadcrumbComp";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { NextPage } from "next";
import axios from "axios";
import { BASE_URL } from "@lib/constants";
import { CartInterface, OrderType } from "@lib/types";
import { Router } from "next/router";

const ThankYou: NextPage<{
  order: OrderType | null;
  token?: string;
  message?: string;
}> = (props) => {
  const { order, token, message } = props;

  if (!order) return <NoOrder message={message} />;

  return (
    <div className="component-wrap">
      <Box className={"breadcrumbs-wrapper"} my={3}>
        <BreadcrumbComp links={links} />
      </Box>
      <div className="page-title font-bold text-xl mb-10">
        {" "}
        ✅ Order Complete
      </div>

      <section className="appreciate">
        <div className="order-id font-medium text-sm text-gray-600">
          Order #{order.order_number}
        </div>
        <div className="text-2xl font-semibold">
          Thank you {order.name.split(" ")[0]} 🥰
        </div>
        <p className="text-sm">for choosing from pauloxuries store.</p>
      </section>

      <div className="flex flex-wrap gap-10 my-6">
        <section className="order-information-container flex-1">
          <div className="customer-information border border-gray-700 p-4  shadow-lg mb-10">
            <div className="title text-xl font-bold mb-4">
              Customer Information
            </div>
            <ul className="infos flex flex-wrap gap-6 sm:px-4 my-10">
              <BasicInfo title="Email" value={order.email} />
              <BasicInfo title="Phone" value={order.phone} />
              <Address
                title="Billing Address"
                address={order.address}
                state={order.state}
                country={order.country}
              />
              <Address
                title="Delivery Address"
                address={order.address}
                state={order.state}
                country={order.country}
              />
            </ul>
          </div>

          <div className="order-details border border-gray-700 p-4 shadow-lg">
            <div className="title text-xl font-bold mb-4">Order Details</div>
            <ul className="products flex flex-col gap-y-4">
              {order.cart.map((cartProduct) => {
                return (
                  <OrderedProduct
                    cartProduct={cartProduct}
                    key={cartProduct.id}
                  />
                );
              })}
            </ul>

            <div className="totals my-5">
              <div className="subtotal flex justify-between items-between p-2">
                <div className="label">Subtotal:</div>
                <div className="amount font-bold">
                  {"₦" + order.subtotal.toLocaleString()}
                </div>
              </div>
              <div className="discount flex justify-between items-between p-2">
                <div className="label">Discount:</div>
                <div className="amount font-bold">
                  {"₦" + order.discount.toLocaleString()}
                </div>
              </div>
              <div className="shipping flex justify-between items-between p-2">
                <div className="label">Shipping:</div>
                <div className="amount font-bold">
                  {"₦" + (3_500).toLocaleString()} via GIG park
                </div>
              </div>

              <Divider />

              <div className="total flex justify-between items-between p-2 mt-5">
                <div className="label font-extrabold">Total:</div>
                <div className="flex items-center flex-wrap-reverse gap-3">
                  <div className="payment-method">
                    <div className="chip naira border border-blue-500 text-blue-500 px-3 py-1 font-bold text-[10px] rounded-full w-max">
                      Pay with Transfer
                    </div>
                  </div>
                  <div className="amount font-black text-xl">
                    {"₦" + order.total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="right sm:w-full md:max-w-[350px]">
          <div className="bank-details pb-[3.5em] border border-gray-700 p-4 shadow-lg">
            <div className="button-group flex gap-x-4">
              <Button
                variant="contained"
                className="bg-primary-low text-white capitalize text-sm rounded-sm shadow-lg"
              >
                Review your orders
              </Button>
              <Button className="bg-primary-low/10 capitalize text-sm rounded-sm shadow-lg">
                Continue Shopping
              </Button>
            </div>
            <div className="bank-details mt-5">
              <Divider>
                <div className="title text-xl text-center font-extrabold">
                  Our Bank Account
                </div>
              </Divider>
              <div className="naira-account my-5 max-w-[400px]">
                <div className="chip naira border border-primary-low text-primary-low px-3 py-1 font-bold text-[10px] rounded-full w-max">
                  Naira Account
                </div>
                <div className="account-name font-bold my-3">
                  Pauloxuries Online
                </div>
                <div className="flex justify-between gap-3">
                  <div className="bank">
                    <div className="caption text-[10px] uppercase">Bank</div>
                    <div className="name font-black text-lg">GTBank</div>
                  </div>
                  <div className="account-number">
                    <div className="caption text-[10px] uppercase">
                      Account Number
                    </div>
                    <div className="number font-black text-lg">0595054179</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="delivery border border-gray-700 p-4 shadow-lg mt-10">
            <div className="title font-bold text-xl mb-5">Delivery</div>
            <div className="text">
              <span>Your order will be delivered within:</span>

              <ul className="list-disc pl-5 my-4">
                <li>Lagos: 1-3 working days</li>
                <li>Outside Lagos: 3-7 working days</li>
              </ul>

              <p className="font-bold text-primary-low">
                Please allow extra day(s) for custom order or bulk order.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

ThankYou.getInitialProps = async (ctx) => {
  try {
    let { orderId, token } = ctx.query as { orderId: string; token: string };

    if (!orderId) {
      return {
        order: null,
      };
    }

    const reqOrder = await axios.get(BASE_URL + "/api/order/" + orderId);

    const {
      success,
      orders: [order],
    } = await reqOrder.data;

    return {
      order: {
        ...order,
        cart: JSON.parse(order.cart),
      },
      token,
    };
  } catch (error) {
    console.error({ error });
    return {
      order: null,
      message: "Error fetching order",
    };
  }
};

const OrderedProduct = (props: { cartProduct: CartInterface }) => {
  const { cartProduct } = props;

  let discount =
    ((cartProduct.product.discountPercentage as number) / 100) *
    cartProduct.quantity;

  let total =
    (cartProduct.product?.price as number) * cartProduct.quantity - discount;

  return (
    <div className="ordered-product card bg-primary-low/10">
      <div className="detail">
        <div className="flex gap-2 items-center">
          <Badge
            badgeContent={cartProduct.quantity}
            className="rounded-sm"
            classes={{ badge: "rounded-lg bg-primary-low" }}
            color={"info"}
          >
            <Avatar
              variant={"rounded"}
              className="p-1 bg-white shadow-lg"
              src={
                "https://pauloxuries.com/images/products/" +
                cartProduct.product!.image?.replaceAll('"', "")
              }
            >
              <ShoppingCartCheckoutIcon />
            </Avatar>
          </Badge>
          <div className="title flex-grow ml-3">
            <span className="font-semibold overflow-hidden text-ellipsis">
              {cartProduct.product.title}
            </span>
            {cartProduct.product.discountPercentage && (
              <>
                <br />
                <small>
                  {cartProduct.product.discountPercentage}% discount each
                </small>
              </>
            )}
          </div>
          <div className="price flex flex-col justify-end gap-y-2">
            <Chip
              className="font-extrabold text-lg text-primary-low"
              label={"₦" + total.toLocaleString()}
            />
            <small>
              {"₦" + (cartProduct.product.price as number).toLocaleString()} per
              item
            </small>
          </div>
        </div>
      </div>
      <div className="flex gap-x-6 gap-y-3 flex-wrap items-center mt-4">
        <div className="wrap flex-wrap flex gap-x-6 gap-y-3 flex-grow">
          {cartProduct.sizes && (
            <div className="sizes-wrap flex gap-x-4 items-center">
              <div className="label text-sm">Sizes:</div>
              <ul className="sizes-selected flex gap-2">
                {cartProduct.sizes?.map((size) => (
                  <div
                    key={size}
                    className="bg-black/10 uppercase h-6 w-6 grid place-items-center shadow-lg rounded-lg font-bold text-[10px]"
                  >
                    {size}
                  </div>
                ))}
              </ul>
            </div>
          )}
          {cartProduct.colors && (
            <div className="colors-wrap flex gap-x-4 items-center">
              <div className="label text-sm">Colors:</div>
              <ul className="colors-selected flex gap-2">
                {cartProduct.colors?.map((color) => (
                  <div
                    key={color}
                    style={{ background: color }}
                    className="bg-black/10 uppercase h-4 w-10 shadow-lg rounded-full font-bold text-xs"
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="actions">
          <Button
            size="small"
            variant="outlined"
            className="capitalize text-sm"
          >
            Delivered
          </Button>
        </div>
      </div>
    </div>
  );
};

const Address = (props: {
  title: string;
  state: string;
  country: string;
  address: string;
}) => (
  <li className="flex-grow min-w-[45%]">
    <span className="title">
      <b>{props.title}</b>
    </span>
    <div className="address">{props.address}</div>
    <div className="state">
      State/County:{" "}
      <i>
        <b>{props.state}</b>
      </i>
    </div>
    <div className="country">
      Country/Region:{" "}
      <i>
        <b>{props.country}</b>
      </i>
    </div>
  </li>
);

const BasicInfo = (props: { title: string; value: string }) => {
  return (
    <li className="flex-grow min-w-[45%]">
      <div className="title">
        <b>{props.title}</b>
      </div>
      <span>{props.value}</span>
    </li>
  );
};

const NoOrder = (props: { message?: string }) => (
  <div className="card w-full p-4">
    <Typography variant={"subtitle2"} my={2}>
      {props.message ?? "Your request is not valid"}
    </Typography>
    <Link href={"/collections"}>
      <Button
        variant={"contained"}
        className="bg-primary-low"
        sx={{ textTransform: "none" }}
      >
        Go to shop
      </Button>
    </Link>
  </div>
);

const links = [
  {
    label: "home",
    path: "/",
  },
  {
    label: "checkout",
    path: "#",
    disabled: true,
  },
  {
    label: "complete",
  },
];

export default ThankYou;
