import { WishesController } from "@/types/wishes";
import { api } from "../api";

const wishesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getWishes: build.query<WishesController.GET, undefined>({
            query: () => "/wishes",
            providesTags: ["Wishes"],
        }),
        addToWishes: build.mutation<WishesController.PUT, WishesController.AddItem>({
            query: (body) => ({
                url: "/wishes",
                method: "PUT",
                body
            }),
            invalidatesTags: ["Wishes"]
        }),
        removeFromWishes: build.mutation<WishesController.DELETE, WishesController.DeleteItem>({
            query: ({ productId, wishesId }) => ({
                url: `/wishes/${wishesId}`,
                method: "DELETE",
                body: { productId }
            }),
            invalidatesTags: ["Wishes"]
        }),
    })
})

export const { useAddToWishesMutation, useGetWishesQuery, useRemoveFromWishesMutation } = wishesApi