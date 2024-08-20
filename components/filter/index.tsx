"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Box, Button, MenuItem, TextField, Divider } from "@mui/material";
import type { Product, RouterQuery } from "@lib/types";
import FilterListIcon from "@mui/icons-material/FilterList";
import { emitCustomEvent } from "react-custom-events";

import useMessage from "@hook/useMessage";

import ExtractProps from "@helper/extractFilterProps";
import checkProduct from "@helper/checkProduct";

import MobileFilter from "./MobileFilter";
import FilterComponent from "./FilterComponent";
import { Events } from "@lib/constants";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

type FilterType = Partial<{ [key in keyof RouterQuery]: string[] }>;
interface FilterProps {
  products: Product[];
}

const initialFilter: FilterType = {
  sort: ["FE"],
  availability: [],
  price: [],
  colors: [],
  sizes: [],
  categories: [],
};

export const sort = {
  FE: "Featured",
  "A-Z": "Alphabetically A-Z",
  "Z-A": "Alphabetically Z-A",
  "P-L-H": "Price (low - high)",
  "P-H-L": "Price (high - low)",
  "D-N-O": "Date (new - old)",
  "D-O-N": "Date (old - new)",
};

export const components: (keyof ReturnType<typeof ExtractProps>)[] = [
  "availability",
  "price",
  "sizes",
  "colors",
  "categories",
];

function Filter(props: FilterProps) {
  const { products } = props;

  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [width, setWidth] = useState<boolean>(true);
  const [sortValue, setSortValue] = useState<keyof typeof sort>("FE");
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;

  const [query, setQuery] = useState<RouterQuery>({
    availability: searchParams.get("availability") || "",
    brand: searchParams.get("brand") || "",
    categories: searchParams.get("categories") || "",
    colors: searchParams.get("colors") || "",
    price: searchParams.get("price") || "",
    sizes: searchParams.get("sizes") || "",
    sort: searchParams.get("sort") || "",
  });

  const filterRef = useRef<HTMLDivElement>(null);

  const { alertMessage } = useMessage();

  const isFirstRender = useRef(true);
  const MobileFilterRef = useRef<{ setDrawer(): void }>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortValue(e.target.value as keyof typeof sort);
    emitCustomEvent(Events.SORT, e.target.value);
  };

  useEffect(() => {
    setWidth(window.innerWidth > 700);
    const handleDocumentClick = (e: Event) => {
      if (window.innerWidth < 700) return;
      let isFilterBox =
        e.target == filterRef.current ||
        filterRef.current?.contains(e.target as Node);

      if (!isFilterBox) emitCustomEvent(Events.FILTER, "");
    };

    const handleResize = () => {
      if (window.innerWidth > 700) setWidth(true);
      else setWidth(false);
    };

    document.onclick = handleDocumentClick;
    window.onresize = handleResize;

    return () => {
      document.onclick = null;
      window.onresize = null;
    };
  }, [props]);

  useEffect(() => {
    const queryKeys = Object.keys(query) as [x: keyof RouterQuery];

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // filter product based on the query in the url
    let filteredProducts = products.filter((product) =>
      checkProduct(query, product)
    );

    emitCustomEvent(Events.FILTERED, filteredProducts);

    // alertMessage(
    //   queryKeys.length
    //     ? `Filtered Products by ${queryKeys.join(",")}`
    //     : "Revoked filter",
    //   "info"
    // );
  }, [query]);

  useEffect(() => {
    setQuery({
      availability: searchParams.get("availability") || "",
      brand: searchParams.get("brand") || "",
      categories: searchParams.get("categories") || "",
      colors: searchParams.get("colors") || "",
      price: searchParams.get("price") || "",
      sizes: searchParams.get("sizes") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  if (!products?.length) return <></>;

  return (
    <div className={""}>
      <div className="filter-box gap-x-4 items-center justify-between flex">
        {width ? (
          <div ref={filterRef} className="hidden sm:flex gap-x-4 max-h-full">
            {components.map((name) => {
              return <FilterComponent key={name} {...{ name, products }} />;
            })}
          </div>
        ) : (
          <MobileFilter ref={MobileFilterRef} products={products} />
        )}
        {!width && (
          <Button
            sx={{ textTransform: "none" }}
            variant={"outlined"}
            onClickCapture={() => MobileFilterRef.current?.setDrawer()}
          >
            <FilterListIcon />
            <span className="text-sm font-bold ml-2">Filter</span>
          </Button>
        )}
        <Box className={"sort-wrapper"} width={200}>
          <TextField
            onChange={handleChange}
            value={sortValue}
            label={"Sort by"}
            fullWidth
            size={"small"}
            name={"sort"}
            select
          >
            {(Object.keys(sort) as (keyof typeof sort)[]).map((type, index) => {
              return (
                <MenuItem
                  value={type}
                  selected={filter.sort![0] === type}
                  key={index}
                >
                  {sort[type]}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </div>
      <Divider className="mt-5" />
    </div>
  );
}

export const FilterComponentLoader: FC = () => {
  return <div className="bg-primary-low/10 animate-pulse p-4 rounded-lg" />;
};

export default Filter;
