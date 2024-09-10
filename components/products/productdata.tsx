"use client";

import { Rating } from "@mui/material";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ProductController } from "@/types/products";

type Option = "description" | "reviews";

const ProductData = ({ product }: { product: ProductController.Product }) => {
  const [activeBtn, setActiveBtn] = useState<Option>("description");

  return (
    <section className="mb-8 mt-12">
      <div className="items-center gap-4 border-t border-t-gray-400 max-md:space-y-2 md:flex">
        <button
          className={`whitespace-nowrap border-t-2 py-2 text-left text-sm font-semibold text-normal_grey transition-colors hover:text-black max-md:w-full ${activeBtn === "description" ? "border-t-dark_blue text-black" : "border-t-transparent"}`}
          onClick={() => setActiveBtn("description")}
        >
          DESCRIPTION
        </button>

        <button
          className={`whitespace-nowrap border-t-2 py-2 text-left text-sm font-semibold text-normal_grey transition-colors hover:text-black max-md:w-full ${activeBtn === "reviews" ? "border-t-dark_blue text-black" : "border-t-transparent"}`}
          onClick={() => setActiveBtn("reviews")}
        >
          REVIEWS
        </button>
      </div>

      {activeBtn === "description" ? (
        <DescriptionData description={product.description} />
      ) : (
        <Reviews />
      )}
    </section>
  );
};

const DescriptionData = ({ description }: { description: string }) => {
  return (
    <div>
      <p className="mt-4 text-gray-500">{description}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h5 className="mt-4 text-xl font-semibold text-dark_grey max-md:text-lg">
        Reviews
      </h5>
      <p className="mt-4 text-normal_grey">There are no reviews yet</p>

      <div className="mt-8">
        <div className="border-2 border-dark_blue p-4 md:p-6 lg:p-8">
          <p className="text-xl font-semibold text-dark_grey max-md:text-lg">
            Be the first to review "Black dress with flower neck"
          </p>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="rating" className="mb-2 block">
                Your rating*
              </label>
              <div>
                <Rating name="simple-controlled" value={3} />
              </div>
            </div>
            <div>
              <label htmlFor="review" className="mb-2 block">
                Your review*
              </label>
              <Textarea placeholder="Your review" rows={5} />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductData;
