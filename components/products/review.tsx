"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@mui/material";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ReviewsController } from "@/types/reviews";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/lib/redux/services/reviews";
import { TailwindSpinner } from "../ui/spinner";
import useMessage from "@/hooks/useMessage";
import { ErrorResponse } from "@/lib/types";
import { Trash } from "lucide-react";
import { Label } from "../ui/label";
import Modal from "../ui/modal";
import clsx from "clsx";
import { useAppSelector } from "@/lib/redux/store";

type Props = {
  review: ReviewsController.Review;
};

const Review = ({ review }: Props) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const id = useAppSelector(state => state.auth.id);

  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const { alertMessage } = useMessage();

  const reviewHasReplies: boolean = useMemo(() => {
    return review.replies.length > 0;
  }, [review]);

  const reviewBelongsToUser: boolean = useMemo(() => {
    return review.userId === id;
  }, [review, id]);

  const reviewHasBeenEdited = useMemo(() => {
    return review.updatedAt !== review.createdAt;
  }, [review]);

  const handleDelete = async () => {
    try {
      await deleteReview(review.id.toString()).unwrap();
      alertMessage("Review deleted successfully", "success");
    } catch (error) {
      if (error instanceof Error) {
        alertMessage(error.message, "error");
      } else {
        const message = (error as ErrorResponse).data.message;
        alertMessage(message || "An error occurred", "error");
      }
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleCloseReplyForm = useCallback(() => {
    setShowReplyForm(false);
  }, []);

  const handleCloseEditForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <header className="mb-2 flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>
            {review.user.firstName[0]}
            {review.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {review.user.firstName} {review.user.lastName}
            </span>
            {reviewHasBeenEdited && <span className="text-xs">Edited</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Rating value={parseInt(review.rating)} size="small" readOnly />
            <span>{format(new Date(review.createdAt), "dd MMM yyyy")}</span>
          </div>
        </div>
      </header>
      <p className="mb-2">{review.text}</p>
      <div className="flex items-center gap-4">
        {reviewHasReplies && (
          <button
            onClick={toggleReplies}
            className={clsx("text-sm focus:outline-none", {
              "text-gray-700": showReplies,
              "text-blue-500": !showReplies,
            })}
          >
            {showReplies ? "Hide Replies" : "Show Replies"}
          </button>
        )}
        <button
          onClick={toggleReplyForm}
          className={clsx("text-sm focus:outline-none", {
            "text-gray-700": showReplyForm,
            "text-blue-500": !showReplyForm,
          })}
        >
          {showReplyForm ? "Cancel Reply" : "Reply"}
        </button>
        {reviewBelongsToUser && (
          <Fragment>
            <button
              className="text-sm text-blue-500 focus:outline-none"
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </button>
            <button
              disabled={isLoading}
              onClick={handleDelete}
              className="text-sm focus:outline-none"
            >
              {isLoading ? (
                <TailwindSpinner className="h-4 w-4" />
              ) : (
                <Trash width={16} color="#FF0000" />
              )}
            </button>
          </Fragment>
        )}
      </div>
      {showReplies && (
        <div className="mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
          {review.replies.map(reply => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </div>
      )}

      <Modal
        open={showEditForm}
        setOpen={setShowEditForm}
        description="Edit your review"
        title="Edit Review"
        maxWidth="sm:max-w-sm"
      >
        <EditReviewForm
          closeFn={handleCloseEditForm}
          defaultText={review.text}
          defaultRating={parseInt(review.rating)}
          id={review.id.toString()}
        />
      </Modal>

      {showReplyForm && (
        <ReplyForm
          closeFn={handleCloseReplyForm}
          parentId={review.id}
          productId={review.productId}
        />
      )}
    </div>
  );
};

const Reply = ({ reply }: { reply: ReviewsController.Review }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const id = useAppSelector(state => state.auth.id);

  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const { alertMessage } = useMessage();

  const handleDelete = async () => {
    try {
      await deleteReview(reply.id.toString()).unwrap();
      alertMessage("Review deleted successfully", "success");
    } catch (error) {
      if (error instanceof Error) {
        alertMessage(error.message, "error");
      } else {
        const message = (error as ErrorResponse).data.message;
        alertMessage(message || "An error occurred", "error");
      }
    }
  };

  const handleClose = useCallback(() => {
    setShowEditForm(false);
  }, []);

  const replyHasBeenEdited = useMemo(() => {
    return reply.updatedAt !== reply.createdAt;
  }, [reply]);

  const replyBelongsToUser: boolean = useMemo(() => {
    return reply.userId === id;
  }, [reply, id]);

  return (
    <div className="mb-2">
      <header className="mb-1 flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" alt="@replyUser" />
          <AvatarFallback>
            {reply.user.firstName[0]}
            {reply.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {reply.user.firstName} {reply.user.lastName}
            </span>
            {replyHasBeenEdited && <span className="text-xs">Edited</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{format(new Date(reply.createdAt), "dd MMM yyyy")}</span>
          </div>
        </div>
      </header>
      <p className="text-sm">{reply.text}</p>
      {replyBelongsToUser && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditForm(true)}
            className={clsx("text-sm focus:outline-none", {
              "text-gray-700": showEditForm,
              "text-blue-500": !showEditForm,
            })}
          >
            Edit
          </button>
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="text-sm focus:outline-none"
          >
            {isLoading ? (
              <TailwindSpinner className="h-4 w-4" />
            ) : (
              <Trash width={16} color="#FF0000" />
            )}
          </button>
        </div>
      )}
      {showEditForm && <EditReplyForm closeFn={handleClose} reply={reply} />}
    </div>
  );
};

const EditReplyForm = memo(
  ({
    closeFn,
    reply,
  }: {
    closeFn: () => void;
    reply: ReviewsController.Review;
  }) => {
    const [updateReply, { isLoading }] = useUpdateReviewMutation();

    const { alertMessage } = useMessage();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const text = formData.get("text") as string;
        if (!text) {
          throw new Error("All fields are required");
        }
        await updateReply({ id: reply.id.toString(), text }).unwrap();
        alertMessage("Reply updated successfully", "success");
        closeFn();
      } catch (error) {
        if (error instanceof Error) {
          alertMessage(error.message, "error");
        } else {
          const message = (error as ErrorResponse).data.message;
          alertMessage(message || "An error occurred", "error");
        }
      }
    };

    return (
      <form className="mt-2" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Write your reply..."
          rows={3}
          name="text"
          defaultValue={reply.text}
          required
        />
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? <TailwindSpinner className="h-4 w-4" /> : "Submit"}
        </Button>
      </form>
    );
  }
);

const EditReviewForm = memo(
  ({
    closeFn,
    defaultRating,
    defaultText,
    id,
  }: {
    closeFn: () => void;
    defaultText: string;
    defaultRating: number;
    id: string;
  }) => {
    const [updateReview, { isLoading }] = useUpdateReviewMutation();

    const { alertMessage } = useMessage();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const rating = parseInt(formData.get("rating") as string);
        const text = formData.get("text") as string;

        if (!rating || !text) {
          throw new Error("Fill all fields");
        }

        await updateReview({ id, text, rating }).unwrap();
        closeFn();
        alertMessage("Review updated", "success");
      } catch (error) {
        if (error instanceof Error) {
          alertMessage(error.message, "error");
        } else {
          const message = (error as ErrorResponse).data.message;
          alertMessage(message || "An error occurred", "error");
        }
      }
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="rating" className="mb-1 block">
            Your Rating*
          </Label>
          <Rating
            name="rating"
            id="rating"
            size="small"
            defaultValue={defaultRating}
          />
        </div>
        <div>
          <Label htmlFor="text" className="mb-1 block">
            Your Review*
          </Label>
          <Textarea
            id="text"
            name="text"
            defaultValue={defaultText}
            placeholder="Write your review here"
            required
          />
        </div>
        <Button disabled={isLoading} size="sm">
          {isLoading ? (
            <TailwindSpinner className="h-4 w-4" />
          ) : (
            "Update Review"
          )}
        </Button>
      </form>
    );
  }
);

const ReplyForm = memo(
  ({
    parentId,
    productId,
    closeFn,
  }: {
    parentId: number;
    productId: number;
    closeFn: () => void;
  }) => {
    const [addReply, { isLoading }] = useAddReviewMutation();

    const { alertMessage } = useMessage();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const text = formData.get("text") as string;
        if (!text) {
          throw new Error("Fill all fields");
        }
        const payload: ReviewsController.AddReview = {
          productId,
          text,
          parentId,
        };
        await addReply(payload).unwrap();
        alertMessage("Reply added successfully", "success");
        (event.target as HTMLFormElement).reset();
        closeFn();
      } catch (error) {
        if (error instanceof Error) {
          alertMessage(error.message, "error");
        } else {
          const message = (error as ErrorResponse).data.message;
          alertMessage(message || "An error occurred", "error");
        }
      }
    };

    return (
      <form className="mt-2" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Write your reply..."
          rows={3}
          name="text"
          required
        />
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? <TailwindSpinner className="h-4 w-4" /> : "Submit"}
        </Button>
      </form>
    );
  }
);

export const ReviewSkeleton = () => {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <header className="mb-2 flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="mb-1 h-4 w-24" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </header>
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-2 h-6 w-1/2" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

EditReplyForm.displayName = "EditReplyForm";
EditReviewForm.displayName = "EditReviewForm";
ReplyForm.displayName = "ReplyForm";
export default Review;
