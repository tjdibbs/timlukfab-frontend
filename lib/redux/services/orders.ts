import { OrderController } from "@/types/orders";
import { api } from "../api";

const ordersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllOrders: build.query<unknown, undefined>({
            query: () => `/orders/user`,
            providesTags: ["Orders"]
        }),
        addOrder: build.mutation<OrderController.POST, OrderController.Create>({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart", "Orders"]
        })
    })
})

export const { useAddOrderMutation } = ordersApi