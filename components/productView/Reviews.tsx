import {} from "react";

import { BASE_URL } from "@lib/constants";
import Add from "@mui/icons-material/Add";
import { Avatar, Button, Collapse, Rating } from "@mui/material";
import axios from "axios";

import React from "react";
import { Product } from "@lib/types";
import { Input } from "antd";
import { useAppSelector } from "@lib/redux/store";
import useMessage from "@hook/useMessage";
import { nanoid } from "nanoid";
import AddReview from "./AddReview";
import stringToColor from "@lib/stringToColor";

export interface ReviewInterface {
  rating: number;
  review: string;
  email: string;
  name: string;
  product: string;
  id: number;
}

function Reviews(props: { product: Product }) {
  const [reviews, setReviews] = React.useState<ReviewInterface[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [add, setAdd] = React.useState<boolean>(false);

  const getReviews = React.useCallback(async () => {
    let endpoint = BASE_URL + "/api/reviews/_/" + props.product.id;
    const req = await axios.get(endpoint);

    const { success, reviews } = await req.data;
    if (success) setReviews(reviews);
  }, [props.product]);

  React.useEffect(() => {
    open && getReviews();
  }, [open, getReviews]);

  return (
    <div className="review-container my-5">
      <Button
        onClickCapture={() => setOpen(!open)}
        className="capitalize"
        variant="outlined"
        fullWidth
      >
        Reviews ({reviews.length}) {open ? "-" : <Add fontSize="small" />}
      </Button>

      <Collapse in={open}>
        <div className="wrap card">
          <div className="flex items-center justify-between">
            <div className="title font-black text-lg">Reviews</div>
            <Button
              onClick={() => setAdd(!add)}
              className="bg-primary-low"
              variant="contained"
              size="small"
            >
              Add A Review
            </Button>
          </div>

          {!reviews.length && (
            <div className="no-review flex justify-between items-center my-4 flex-wrap gap-3">
              <div className="text">There is no review for this product</div>
            </div>
          )}
          {/* This collapse works for review form */}
          <Collapse in={add}>
            <AddReview
              setReviews={setReviews}
              noReview={!reviews.length}
              product={props.product}
            />
          </Collapse>
          <div className="review-list-wrap">
            <ul className="review-list mt-4">
              {reviews.map(({ id, name, review }) => (
                <li
                  key={id}
                  className="review flex gap-x-4 items-start bg-white p-3 mb-3 rounded-lg"
                >
                  <Avatar
                    sx={{
                      background: stringToColor(name),
                      textTransform: "uppercase",
                    }}
                  >
                    {name.at(0)} {name.split(" ")[1]?.at(0)}
                  </Avatar>
                  <div className="text">
                    <div className="name font-bold capitalize">{name}</div>
                    <div className="review-text text-sm">{review}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Reviews;
