"use client"

import React from "react";
import { SwipeableDrawer } from "@mui/material";
import { Product } from "@lib/types";
import FilterComponent from "./FilterComponent";
import { components } from ".";

export default React.forwardRef<{ setDrawer(): void }, { products: Product[] }>(
  function MobileFilter(props, ref) {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
      setDrawer: () => setOpenDrawer(true),
    }));

    return (
      <SwipeableDrawer
        anchor={"bottom"}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        open={openDrawer}
        sx={{ ".MuiDrawer-paper": { borderRadius: "20px 20px 0 0" } }}
      >
        <div
          className="w-24 h-1.5 rounded-xl bg-black/50 mx-auto cursor-pointer my-2"
          onClick={() => setOpenDrawer(false)}
        />
        <div className="flex flex-col gap-y-3 p-3">
          {components.map((name) => {
            return (
              <FilterComponent
                key={name}
                {...{ name, products: props.products }}
              />
            );
          })}
        </div>
      </SwipeableDrawer>
    );
  }
);
