"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const PRICE_RANGE = [10, 1000];

const FilterSlider = () => {
  const [value, setValue] = useState<number[]>(PRICE_RANGE);

  const handleChange = (value: number | number[]) => {
    setValue(Array.isArray(value) ? value : [value, value]);
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
        <button className="rounded-full bg-normal_grey px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-dark_grey hover:text-white">
          filter
        </button>
        <p className="text-xs font-semibold text-dark_grey">
          Price: ${value[0]} - ${value[1]}
        </p>
      </div>
    </div>
  );
};
export default FilterSlider;
