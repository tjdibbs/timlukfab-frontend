import React from "react";
import { Box, CardActionArea } from "@mui/material";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { emitCustomEvent } from "react-custom-events";
import Price from "@comp/filter/price";
import FilterChunk from "@comp/filter/FilterChunk";
import { Product } from "@lib/types";
import ExtractProps from "@helper/extractFilterProps";

function FilterComponent(props: { name: string; products: Product[] }) {
  const { name, products } = props;
  const productProps = ExtractProps(products);

  console.log({ productProps: "" });

  return (
    <div className="relative">
      <CardActionArea
        onClick={() => {
          emitCustomEvent("filterEvent", name);
        }}
      >
        <div className="p-2 flex justify-between h-auto shadow-sm gap-x-4 items-center rounded-lg bg-primary-low/5">
          <span className="text-sm font-semibold capitalize">{name}</span>
          <ArrowDropDownOutlined />
        </div>
      </CardActionArea>
      {name === "price" ? (
        <Price t={productProps.price} />
      ) : (
        <FilterChunk
          filters={productProps[name as keyof typeof productProps]}
          name={name}
        />
      )}
    </div>
  );
}

export default FilterComponent;
