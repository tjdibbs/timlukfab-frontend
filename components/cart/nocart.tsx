import { Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import type { CartInterface } from "@lib/types";

function NoCart({ cart }: { cart: Partial<CartInterface>[] }) {
  if (cart?.length) return <></>;
  return (
    <div className="card grid place-items-center w-full mt-5">
      <p className="text-sm mb-3 font-bold">There is no product in your cart</p>
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
}

export default dynamic(async () => await NoCart, { ssr: false });
