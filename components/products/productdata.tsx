"use client";

import { Rating } from "@mui/material";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ProductController } from "@/types/products";
import {
  useAddReviewMutation,
  useGetProductReviewsQuery,
} from "@/lib/redux/services/reviews";
import { useAppSelector } from "@/lib/redux/store";
import Review, { ReviewSkeleton } from "./review";
import useMessage from "@/hooks/useMessage";
import { ErrorResponse } from "@/lib/types";
import { TailwindSpinner } from "../ui/spinner";
import { ReviewsController } from "@/types/reviews";

type Option = "description" | "reviews";

const ProductData = ({ product }: { product: ProductController.Product }) => {
  const [activeBtn, setActiveBtn] = useState<Option>("reviews");

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
        <Reviews product={product} />
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

const Reviews = ({ product }: { product: ProductController.Product }) => {
  const token = useAppSelector(state => state.auth.token);
  const id = useAppSelector(state => state.auth.id);
  const { data, isLoading, refetch, isError } = useGetProductReviewsQuery(
    product.id.toString(),
    {
      skip: !token,
    }
  );

  const { alertMessage } = useMessage();

  useEffect(() => {
    if (isError) {
      alertMessage("We are having problems with the server", "error");
    }
    if (token) {
      refetch();
    }
  }, [token, isError]);

  const reviewsThatAreNotReplies = useMemo(() => {
    return data?.result.reviews.filter(review => !review.parentId) || [];
  }, [data]);

  const userHasReviewed: boolean = useMemo(() => {
    return data?.result.reviews.some(review => review.userId === id) || false;
  }, [data, id]);

  if (isLoading || !data) {
    return (
      <div>
        <h5 className="my-4 text-xl font-semibold text-dark_grey max-md:text-lg">
          Reviews
        </h5>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ReviewSkeleton key={index + 1} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h5 className="my-4 text-xl font-semibold text-dark_grey max-md:text-lg">
        Reviews ({reviewsThatAreNotReplies.length})
      </h5>
      {data.result.reviews.length > 0 && (
        <div className="space-y-4">
          {reviewsThatAreNotReplies.map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      )}

      {!!(data.result.reviews.length === 0) && (
        <p className="mt-4 text-normal_grey">There are no reviews yet</p>
      )}

      {!userHasReviewed && (
        <ReviewForm
          length={reviewsThatAreNotReplies.length}
          product={product}
        />
      )}
    </div>
  );
};

const ReviewForm = ({
  product,
}: {
  product: ProductController.Product;
  length: number;
}) => {
  const { alertMessage } = useMessage();

  const [addReview, { isLoading }] = useAddReviewMutation();

  useEffect(() => {
    console.log("length", length);
  }, [length]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const rating = formData.get("rating");
      const text = formData.get("text");

      if (!rating || !text) {
        throw new Error("Choose a rating");
      }

      const payload: ReviewsController.AddReview = {
        productId: product.id,
        text: text as string,
        rating: parseInt(rating as string),
      };

      await addReview(payload).unwrap();
      alertMessage("Review added successfully", "success");
    } catch (error) {
      if (error instanceof Error) {
        alertMessage(error.message, "error");
      } else {
        const message = (error as ErrorResponse).data.message;
        alertMessage(message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="border-2 border-dark_blue p-4 md:p-6 lg:p-8">
        <p className="text-xl font-semibold text-dark_grey max-md:text-lg">
          {length === 0
            ? `Be the first to review "${product.name}"`
            : `Review ${product.name}`}
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rating" className="mb-2 block">
              Your rating*
            </label>
            <div>
              <Rating name="rating" id="rating" defaultValue={0} />
            </div>
          </div>
          <div>
            <label htmlFor="review" className="mb-2 block">
              Your review*
            </label>
            <Textarea placeholder="Your review" name="text" rows={5} required />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading ? <TailwindSpinner className="h-5 w-5" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductData;
