import React from "react";
import {
  Avatar,
  Badge,
  Box,
  CardActionArea,
  Chip,
  Collapse,
  Divider,
} from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { CheckoutInterface, CartInterface } from "@lib/types";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const ShippingSummary = ({
  checkout,
}: {
  checkout: CheckoutInterface<CartInterface> | null;
}) => {
  const [width, setWidth] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWidth(window.innerWidth >= 900);

    const handleResize = () => {
      if (window.innerWidth >= 900) setWidth(true);
      else setWidth(false);
    };

    window.onresize = handleResize;
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!checkout) return <></>;

  return (
    <div
      className={
        "summary bg-primary-low/10 sm:min-w-full md:min-w-[400px] max-w-full rounded-lg h-full shadow-lg overflow-hidden"
      }
    >
      <div className="flex items-center justify-between p-3 bg-primary-low/20">
        <CardActionArea
          className={
            "summary-toggle cursor-pointer flex gap-x-2 items-center w-max rounded-lg p-2"
          }
          onClick={() => setWidth(!width)}
        >
          {width ? (
            <KeyboardArrowUpRoundedIcon />
          ) : (
            <KeyboardArrowDownRoundedIcon />
          )}
          <span className="font-bold">Show Order Summary</span>
        </CardActionArea>
        <Box className={"order-total-price"}>
          <Chip
            label={"₦" + checkout.total?.toLocaleString("en")}
            className="font-bold bg-white shadow-lg"
          />
        </Box>
      </div>
      <Collapse in={width}>
        <div className="flex flex-col px-2 py-4 gap-y-3">
          {checkout.cart?.map((cartProduct, i) => {
            return (
              <div
                key={cartProduct.product.id}
                className="bg-white p-2 rounded-lg shadow-lg"
              >
                <div className="flex gap-2 items-center">
                  <Badge badgeContent={cartProduct.quantity} color={"info"}>
                    <Avatar
                      variant={"rounded"}
                      className="shadow-lg"
                      src={
                        "https://pauloxuries.com/images/products/" +
                        cartProduct.product!.image?.replaceAll('"', "")
                      }
                    >
                      <ShoppingCartCheckoutIcon />
                    </Avatar>
                  </Badge>
                  <div className="title ml-3 block whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-semibold text-sm ">
                      {cartProduct.product!.title} Lorem ipsum dolor sit amet.
                    </span>
                  </div>
                  <Chip
                    className="font-extrabold text-sm text-primary-low"
                    label={
                      "₦" +
                      (
                        (cartProduct.product!.price as number) *
                        cartProduct.quantity
                      ).toLocaleString()
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="totals my-5 px-4">
          <div className="subtotal flex justify-between items-between p-2">
            <div className="label">Subtotal:</div>
            <div className="amount font-bold">
              {"₦" + checkout.subtotal.toLocaleString()}
            </div>
          </div>
          <div className="discount flex justify-between items-between p-2">
            <div className="label">Discount:</div>
            <div className="amount font-bold">
              {"₦" + checkout.discount.toLocaleString()}
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
            <div className="amount font-black text-xl text-primary-low">
              {"₦" + checkout.total.toLocaleString()}
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default React.memo(ShippingSummary);
