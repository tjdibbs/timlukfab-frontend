/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Button, MenuItem, TextField, Divider } from "@mui/material";
import type { Product, RouterQuery } from "@lib/types";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter } from "next/router";
import { emitCustomEvent } from "react-custom-events";

import useMessage from "@hook/useMessage";

import ExtractProps from "@helper/extractFilterProps";
import checkProduct from "@helper/checkProduct";

import MobileFilter from "./MobileFilter";
import FilterComponent from "./FilterComponent";
import { Events } from "@lib/constants";

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

  const [filter, setFilter] = React.useState<FilterType>(initialFilter);
  const [width, setWidth] = React.useState<boolean>(true);
  const [sortValue, setSortValue] = React.useState<keyof typeof sort>("FE");

  const filterRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { alertMessage } = useMessage();

  const isFirstRender = React.useRef(true);
  const MobileFilterRef = React.useRef<{ setDrawer(): void }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue(e.target.value as keyof typeof sort);
    emitCustomEvent(Events.SORT, e.target.value);
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    const query = router.query as unknown as RouterQuery;
    const queryKeys = Object.keys(query) as [x: keyof RouterQuery];

    if (isFirstRender.current || !router.isReady) {
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
  }, [router]);

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

export const FilterComponentLoader: React.FC = () => {
  return <div className="bg-primary-low/10 animate-pulse p-4 rounded-lg" />;
};

export default Filter;
