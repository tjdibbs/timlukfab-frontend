import React from "react";
import { CheckoutInterface, CartInterface, OrderType } from "@lib/types";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Radio,
  Typography,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import axios from "axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { setAllCarts } from "@lib/redux/cartSlice";
import Login from "@mui/icons-material/Login";

import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Input } from "antd";
import { BASE_URL } from "@lib/constants";
import useMessage from "@hook/useMessage";

interface InformationProps {
  checkout: CheckoutInterface<CartInterface> | null;
}

const Information = ({ checkout }: InformationProps) => {
  const formdata = JSON.parse(Cookie.get("formdata") ?? "{}");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const SubmitBtn = React.useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { alertMessage } = useMessage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<OrderType>({
    defaultValues: {
      ...formdata,
      paymentMethod: "transfer",
      agree: true,
      subscribe: true,
    },
  });

  const { user, cart } = useAppSelector((state) => state.shop);
  const { country, state, agree, subscribe, create, update } = watch();

  const onSubmit = async (data: OrderType) => {
    setLoading(true);

    const formData = {
      ...(user
        ? {
            user: {
              userid: user!.id,
              firstname: user!.firstname,
              lastname: user!.lastname,
              email: user!.email,
            },
          }
        : {}),
      ...data,
      ...checkout,
    };

    try {
      const req = await axios.post(BASE_URL + "/api/order/checkout", formData);

      const { success, orderId, token } = await req.data;
      if (success) {
        alertMessage("Order completed", "success");

        let newCarts = cart.filter((_c) => {
          let checkOrder = checkout!.cart.findIndex(
            ({ product }) => product.id === _c.product?.id
          );
          return checkOrder === -1;
        });

        dispatch(
          setAllCarts({ userid: user?.id, cart: newCarts as CartInterface[] })
        ).then(() => {
          Cookie.remove("checkout");
          Cookie.remove("formdata");

          if (!user) {
            Cookie.set("previous_email", data.email);
          }

          router.replace(
            `/checkout/thank-you?orderId=${orderId}&${
              token ? `token=${token}` : ""
            }`
          );
        });
      }
    } catch (error: any) {
      alertMessage(error.message, "error");
    }

    // if (data.type) {
    //   enqueueSnackbar(
    //     <Box sx={{ maxWidth: 400 }}>
    //       <p>{data.type}</p>
    //       <p>
    //         Some of the products is out of stock or over stake, Please clear
    //         your cart and select products again
    //       </p>
    //     </Box>,
    //     {
    //       variant: "error",
    //       anchorOrigin: {
    //         vertical: "bottom",
    //         horizontal: "left",
    //       },
    //     }
    //   );
    // }

    setLoading(false);
  };

  const ControllerComp = (props: {
    required?: boolean;
    name: keyof OrderType;
    id: string;
    placeholder?: string;
    content?: (
      field: ControllerRenderProps<OrderType, keyof OrderType>
    ) => React.ReactElement;
  }) => {
    return (
      <Controller
        name={props.name}
        control={control}
        rules={{ required: props.required ?? false }}
        render={({ field }) =>
          props.content ? (
            props.content(field)
          ) : (
            // @ts-ignore
            <Input
              className={"form-control"}
              size="large"
              id={props.id}
              status={errors[props.name] && "error"}
              {...field}
              placeholder={props.placeholder ?? "----- ... ----"}
            />
          )
        }
      />
    );
  };

  return (
    <Box
      className={"checkout-information"}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      flexGrow={1}
    >
      {!user && <ReturnCustomer />}
      <Box className={"form-group"}>
        <h1 className="text-lg font-extrabold my-5">Shipping Address</h1>
        <Grid container spacing={{ xs: 1.5, sm: 1 }}>
          <Grid item xs={12}>
            <Box className="form-group">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Full Name <b className="text-red-600">*</b>
              </label>
              {/* <ControllerComp name="name" id="name" required /> */}
              {ControllerComp({ required: true, name: "name", id: "name" })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="form-group">
              <label htmlFor="phone" className="block text-sm font-bold mb-2">
                Phone <b className="text-red-600">*</b>
              </label>
              {ControllerComp({ required: true, name: "phone", id: "phone" })}
              {/* <ControllerComp name="phone" id="phone" required /> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="form-group">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email <b className="text-red-600">*</b>
              </label>
              {ControllerComp({ required: true, name: "email", id: "email" })}
            </Box>
          </Grid>
        </Grid>
        <div className="form-group my-3">
          <label
            htmlFor="country_region"
            className="block text-sm font-bold mb-2"
          >
            Country / Region <b className="text-red-600">*</b>
          </label>
          <CountryDropdown
            id="country_region"
            classes="px-3 py-1.5 border border-gray-300 shadow-sm rounded-[5px] w-full"
            value={country}
            {...{
              ...register("country", { required: true }),
              onChange: (country) => setValue("country", country),
              onBlur: (country) => setValue("country", country),
            }}
          />
        </div>
        <div className="form-group flex flex-col gap-y-2">
          <label htmlFor="state_county" className="block text-sm font-bold">
            State/County <b className="text-red-600">*</b>
          </label>
          <RegionDropdown
            id="state_country"
            classes="px-3 py-1.5 border border-gray-300 shadow-sm rounded-[5px] w-full"
            country={country}
            value={state}
            {...{
              ...register("state", { required: true }),
              onChange: (state) => setValue("state", state),
              onBlur: (state) => setValue("state", state),
            }}
          />
        </div>
        <Box className="form-group my-3">
          <label htmlFor="address" className="block text-sm font-bold mb-2">
            Street Address <b className="text-red-600">*</b>
          </label>
          {ControllerComp({
            required: true,
            name: "address",
            id: "address",
            placeholder: "-------- eg. 46, Ade Adaramoye Street -------",
          })}
        </Box>
        <Box className="form-group">
          {ControllerComp({
            name: "other",
            id: "other",
            placeholder: "Apartment, suite, unit, etc. (optional)",
          })}
        </Box>
      </Box>
      <div className="additional-information my-3">
        <label id="additional-information" className="title font-bold my-3">
          Additional Information
        </label>
        {ControllerComp({
          name: "additionalInformation",
          id: "additional-information",
          placeholder:
            "Notes about your order, e.g. special notes for delivery.",
          content: (field) => (
            // @ts-ignore
            <Input.TextArea
              placeholder="Notes about your order, e.g. special notes for delivery."
              rows={5}
              showCount
              maxLength={1000}
              {...field}
            />
          ),
        })}
      </div>
      <Box className={"payment-method"}>
        <Typography fontWeight={700} mb={1}>
          Payment Method
        </Typography>

        <div className="transfer-method">
          <div className="flex items-center">
            <Radio defaultChecked id="transfer" title="Pay with transfer" />
            <label htmlFor="transfer">Pay with transfer</label>
          </div>
          <div className="info text-sm p-4 bg-slate-400 text-white relative mt-5">
            <div className="arrow absolute rotate-45 left-16 -top-3 bg-inherit h-6 w-6"></div>
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </div>
        </div>
      </Box>

      <div className="action-group mt-10">
        {!user && (
          <div className="form-group flex flex-col">
            <div className="flex items-center">
              <Checkbox
                id="update"
                value={update}
                onChange={(e) => setValue("update", e.target.checked)}
              />
              <label htmlFor="update" className="text-sm">
                UPDATE ME ON NEW DEALS, PRODUCTS & OFFERS.
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="subscribe"
                name="subscribe"
                defaultChecked
                value={subscribe}
                onChange={(e) => setValue("subscribe", e.target.checked)}
              />
              <label htmlFor="subscribe" className="text-sm">
                SUBSCRIBE TO OUR NEWSLETTER
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="create"
                value={create}
                onChange={(e) => setValue("create", e.target.checked)}
              />
              <label htmlFor="create" className="text-sm">
                CREATE AN ACCOUNT?
              </label>
            </div>
          </div>
        )}

        <div className="bg-primary-low/10 p-4 rounded-lg my-5">
          {/* make the user aware of what we will be using their personal data to process */}
          <div className="awareness-text text-sm">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </div>

          {/* Checking the box says, we should g */}
          <div className="form-group mt-4 agree flex items-center">
            <Checkbox
              id="agree"
              defaultChecked
              value={agree}
              required
              onChange={(e) => setValue("agree", e.target.checked)}
            />
            <label htmlFor="agree" className="capitalize font-bold text-sm">
              i have read and agree to the website{" "}
              <Link href={"terms"}>terms and conditions</Link>{" "}
              <b className="text-red-600">*</b>
            </label>
          </div>
        </div>

        <button
          className="btn bg-primary-low text-white mt-4"
          type={"submit"}
          disabled={loading}
          ref={SubmitBtn}
        >
          {loading && <CircularProgress size={18} className={"mr-4"} />}
          <span>Submit Order</span>
        </button>
      </div>
    </Box>
  );
};

const ReturnCustomer = () => {
  return (
    <div className="returning-login">
      <div className="flex items-center bg-gray-200 p-3 gap-3 rounded-lg">
        <Login />
        <div className="text">
          Returning Customer{" "}
          <Link
            className="underline text-primary-low font-bold"
            href={"/sign-in?redirect=checkout"}
          >
            Click to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Information;
