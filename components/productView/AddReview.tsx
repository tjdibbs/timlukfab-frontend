import React from "react";
import { BASE_URL } from "@lib/constants";
import { Button, Rating } from "@mui/material";
import axios from "axios";
import { Product } from "@lib/types";
import { Input } from "antd";
import { useAppSelector } from "@lib/redux/store";
import useMessage from "@hook/useMessage";
import { ReviewInterface } from "./Reviews";

const AddReview: React.FC<{
  noReview: boolean;
  product: Product;
  setReviews: React.Dispatch<React.SetStateAction<ReviewInterface[]>>;
}> = (props) => {
  const user = useAppSelector((state) => state.shop.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [state, setState] = React.useState<Partial<ReviewInterface>>({});

  const { alertMessage } = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(), setLoading(true);

    try {
      let endpoint = BASE_URL + "/api/reviews/new";

      let formData = {
        product: props.product.id,
        ...state,
        //   if user the email and name field will not display on the browser, so we get name and email from the user store
        ...(!user
          ? {}
          : { email: user.email, name: user.firstname + user.lastname }),
      };

      let req = await axios.put(endpoint, formData);
      let res = await req.data;

      if (res === "Created") {
        alertMessage("Review uploaded", "success");

        props.setReviews((reviews) =>
          [state as ReviewInterface, reviews].flat()
        );
        setState({});
      } else alertMessage("Review failed upload", "error");

      //   ------
    } catch (error) {
      console.error(error);
      alertMessage("Review failed upload", "error");
    }

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="rating-wrap">
      {props.noReview && (
        <div className="no-review-control-text font-bold">
          BE THE FIRST TO REVIEW “{props.product.title}”
        </div>
      )}
      <small className="caption">
        Your email address will not be published. Required fields are marked{" "}
        <b className="text-red-600">*</b>
      </small>
      <form action="" className="review-form" onSubmit={handleSubmit}>
        <div className="form-group flex mt-2 gap-x-2 items-center">
          <p className="label text-sm font-bold ">
            Rating <b className="text-red-600">*</b>
          </p>
          <Rating
            name="simple-controlled"
            color="primary"
            value={state.rating ?? 0}
            onChange={(event, newValue) => {
              setState({ ...state, rating: newValue as number });
            }}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="review-text" className="text-sm font-bold block">
            Your Review <b className="text-red-600">*</b>
          </label>
          <Input.TextArea
            id="review-text"
            rows={6}
            placeholder="Message"
            required
            name="review"
            value={state.review}
            onChange={handleChange}
            showCount
            maxLength={1000}
          />
        </div>
        {!user && (
          <React.Fragment>
            <div className="form-group my-3">
              <label htmlFor="name" className="font-bold text-sm block">
                Full name <b className="text-red-600">*</b>
              </label>
              <Input
                required
                id="name"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="font-bold text-sm">
                Email <b className="text-red-600">*</b>
              </label>
              <Input
                required
                name="email"
                value={state.email}
                onChange={handleChange}
                id="name"
                placeholder="Enter valid email"
              />
            </div>
            <div className="form-group"></div>
          </React.Fragment>
        )}

        <Button
          variant="contained"
          disabled={loading}
          type="submit"
          className="bg-slate-700 my-4 font-bold capitalize"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
