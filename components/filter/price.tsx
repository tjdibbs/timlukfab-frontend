import React from "react";
import { Button, Collapse, Slider } from "@mui/material";
import { useRouter } from "next/router";
import { useCustomEventListener } from "react-custom-events";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function Price(props: {
  t: { lowest: number; highest: number };
}) {
  const router = useRouter();
  const queryPrice = (router.query.price as string)?.split("-") ?? [];

  const [open, setOpen] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<number[]>([
    queryPrice[0] ? parseInt(queryPrice[0]) : props.t.lowest,
    queryPrice[1] ? parseInt(queryPrice[1]) : props.t.highest,
  ]);

  let minDistance = 3000;

  const apply = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, price: price[0] + "-" + price[1] },
      },
      undefined,
      { shallow: true }
    );
  };

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((prev) => {
      return prev && data === "price" ? false : data === "price";
    });
  });

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPrice([clamped - minDistance, clamped]);
      }
    } else {
      setPrice(newValue as number[]);
    }
  };

  return (
    <Collapse
      className="sm:absolute left-0 z-10 mt-2 sm:top-full w-full sm:w-52"
      in={open}
    >
      <div className="card">
        <div className="flex justify-between text-xs font-semibold">
          <span>Min</span>
          <span>Max</span>
        </div>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={price}
          className="w-full"
          max={props.t.highest}
          min={props.t.lowest}
          step={5000}
          size="small"
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            if (value === price[0]) {
              return (
                <div
                  className="price-display text-center flex flex-col"
                  key={value}
                >
                  <small>min</small>
                  <small>{value.toLocaleString("en")}</small>
                </div>
              );
            }
            return (
              <div
                className="price-display text-center flex flex-col"
                key={value}
              >
                <small>max</small>
                <small>{value.toLocaleString("en")}</small>
              </div>
            );
          }}
          getAriaValueText={valuetext}
          disableSwap
        />
        <div className="action flex justify-end">
          <Button
            onClickCapture={apply}
            type={"button"}
            variant={"outlined"}
            size={"small"}
          >
            Apply
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
