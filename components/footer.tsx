/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  TextField,
  useTheme,
  Box,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Image from "next/image";
import LocationCityRounded from "@mui/icons-material/LocationOn";
import Call from "@mui/icons-material/Call";
import EmailRounded from "@mui/icons-material/EmailRounded";
import { BASE_URL } from "@lib/constants";

export default function Footer() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: { email: string }) => {
    fetch(BASE_URL + "/api/subscribe", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const res = await response.json();
      enqueueSnackbar(res.message || "Thanks for subscribing", {
        variant: res.success ? "success" : "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });

      if (res.success) {
        reset({ email: "" });
      }
    });
  };

  const bgcolor = theme.palette.secondary.dark;

  return (
    <footer className="bg-primary-low/10">
      <div className="max-w-[1100px] p-4 mx-auto">
        <Box className="community" maxWidth={600}>
          <h5 className="font-extrabold text-xl mb-2">Join Our Community</h5>
          <p className="text-sm">
            Get 10% off your first order and be the first to get the latest
            updates on our promotion campaigns, products and services.
          </p>
          <form
            className="form-control my-4 flex items-center flex-wrap gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              size="small"
              variant="outlined"
              label={"Enter your email"}
              {...register("email", { required: true })}
              sx={{
                minWidth: 250,
                flexGrow: 1,
                mr: 3,
              }}
              error={Boolean(errors.email)}
            />
            <Button
              variant="contained"
              className="bg-primary-low text-white"
              size="small"
              type={"submit"}
            >
              Subscribe
            </Button>
          </form>
        </Box>
        <Divider />
        <div className="my-4 flex flex-wrap gap-4 justify-between">
          <Box width={500}>
            <Link href={"/"} className="block w-max -ml-3">
              <Image
                src={`/identity/logo.png`}
                loading="lazy"
                alt={"Pauloxuries logo"}
                width={180}
                height={60}
                className={`w-full object-fill  pointer-events-none`}
              />
            </Link>
            <p className="mt-6">
              The premier e-commerce destination for men and women’s style
              combining the best brands that focus on craftsmanship and
              elegance.
            </p>

            <div className="flex items-center gap-x-3 mt-10">
              <LocationCityRounded />
              <div className="address font-bold my-2">
                70 Alhaji Masha Road, Surulere Lagos.
              </div>
            </div>

            <div className="contact">
              <div className="phone flex items-center gap-x-3 mb-2 font-semibold">
                <Call />
                <a href="tel:+2349031469068">+2349031469068</a>
              </div>
              <div className="email flex items-center gap-x-3 font-semibold">
                <EmailRounded />
                <a href="mailto:sales@pauloxuries.com">sales@pauloxuries.com</a>
              </div>
            </div>
            <div
              className={"social-icons flex gap-x-3 items-center mt-10 -ml-3"}
            >
              <Link target={"_blank"} href="https://twitter.com/pauloxuries">
                <IconButton>
                  <TwitterIcon />
                </IconButton>
              </Link>
              <Link target={"_blank"} href="https://facebook.com/pauloxuries">
                <IconButton>
                  <FacebookRoundedIcon />
                </IconButton>
              </Link>
              <Link target={"_blank"} href="https://instagram.com/pauloxuries">
                <IconButton>
                  <InstagramIcon />
                </IconButton>
              </Link>
            </div>
          </Box>
          <div>
            <List>
              {links.map((link) => {
                return (
                  <Link
                    href={"/" + link.url}
                    style={{ textDecoration: "none" }}
                    passHref
                    key={link.text}
                  >
                    <ListItemButton className="rounded-lg mb-4 bg-black/5">
                      <span className="text-sm">{link.text}</span>
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </div>
          <div>
            <List>
              {links2.map((link) => {
                return (
                  <Link
                    href={"/" + link.url}
                    style={{ textDecoration: "none" }}
                    passHref
                    key={link.text}
                  >
                    <ListItemButton className="rounded-lg mb-4 bg-black/5">
                      <span className="text-sm">{link.text}</span>
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </div>
        </div>
      </div>
      <div className="text-center p-4 bg-primary-low text-white">
        <span>© {new Date().getFullYear()} PAULOXURIES</span>
      </div>
    </footer>
  );
}

const links = [
  { text: "About us", url: "about-us" },
  { text: "Shipping", url: "shipping" },
];

const links2 = [{ text: "Return & Refund Policy", url: "return_refund" }];
