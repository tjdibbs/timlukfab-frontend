"use client";

import { useState } from "react";
import RelatedProducts from "./relatedproducts";

type Option = "description" | "information" | "reviews";

const ProductData = () => {
  const [activeBtn, setActiveBtn] = useState<Option>("description");

  return (
    <section className="mt-12">
      <div className="items-center gap-4 max-md:space-y-2 md:flex">
        <button
          className={`whitespace-nowrap border-t-2 py-2 text-left text-sm font-semibold text-normal_grey transition-colors hover:text-black max-md:w-full ${activeBtn === "description" ? "border-t-dark_blue text-black" : "border-t-transparent"}`}
          onClick={() => setActiveBtn("description")}
        >
          DESCRIPTION
        </button>
        <button
          className={`whitespace-nowrap border-t-2 py-2 text-left text-sm font-semibold text-normal_grey transition-colors hover:text-black max-md:w-full ${activeBtn === "information" ? "border-t-dark_blue text-black" : "border-t-transparent"}`}
          onClick={() => setActiveBtn("information")}
        >
          ADDITIONAL INFORMATION
        </button>
        <button
          className={`whitespace-nowrap border-t-2 py-2 text-left text-sm font-semibold text-normal_grey transition-colors hover:text-black max-md:w-full ${activeBtn === "reviews" ? "border-t-dark_blue text-black" : "border-t-transparent"}`}
          onClick={() => setActiveBtn("reviews")}
        >
          REVIEWS
        </button>
      </div>
    </section>
  );
};

export default ProductData;
