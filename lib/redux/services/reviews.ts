import { api } from "../api";

const reviewApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProductReviews: build.query({
            query: () => ""
        })
    })

})

export const { useGetProductReviewsQuery } = reviewApi