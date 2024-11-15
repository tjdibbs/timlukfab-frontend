import { ReviewsController } from '@/types/reviews';
import { api } from '../api';

const reviewApi = api.injectEndpoints({
  endpoints: build => ({
    getProductReviews: build.query<ReviewsController.GET, string>({
      query: productId => `/reviews/product/${productId}`,
      providesTags: ['Reviews'],
    }),
    addReview: build.mutation<
      ReviewsController.PUT,
      ReviewsController.AddReview
    >({
      query: body => ({
        url: `/reviews`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Reviews'],
    }),
    updateReview: build.mutation<
      ReviewsController.PATCH,
      Partial<ReviewsController.AddReview> & { id: string }
    >({
      query: body => ({
        url: `/reviews/${body.id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: ['Reviews'],
    }),
    deleteReview: build.mutation<ReviewsController.DELETE, string>({
      query: id => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
