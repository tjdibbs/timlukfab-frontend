"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const PRICE_RANGE = [10, 1000];

const RangeSlider = ({ closeFn }: { closeFn?: () => void }) => {
  const [value, setValue] = useState<number[]>(PRICE_RANGE);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (value: number | number[]) => {
    setValue(Array.isArray(value) ? value : [value, value]);
  };

  const handleFilter = () => {
    if (value[0] && value[1]) {
      const orderby = searchParams.get("orderby");
      const query = !!orderby
        ? `${pathname}?min_price=${value[0]}&max_price=${value[1]}&orderby=${orderby}`
        : `${pathname}?min_price=${value[0]}&max_price=${value[1]}`;

      router.push(query);
      if (closeFn) {
        closeFn();
      }
    }
  };

  return (
    <div className="mx-auto max-md:w-[95%]">
      <Slider
        range
        min={PRICE_RANGE[0]}
        max={PRICE_RANGE[1]}
        value={value}
        onChange={handleChange}
        className="rc-slider-custom"
        styles={{
          track: { backgroundColor: "#999" },
          handle: { borderColor: "#555555", backgroundColor: "#555555" },
        }}
      />
      <div className="mt-2 flex items-center justify-between">
        <button
          className="rounded-full bg-normal_grey px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-dark_grey hover:text-white"
          onClick={handleFilter}
        >
          filter
        </button>
        <p className="text-sm font-medium text-dark_grey">
          Price: ${value[0]} - ${value[1]}
        </p>
      </div>
    </div>
  );
};
export default RangeSlider;
