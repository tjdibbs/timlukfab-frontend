import { CartController } from "@/types/cart";
import { api } from "../api";

const cartApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query({
            query: () => ({
                url: "/cart/items"
            }),
            providesTags: ["Cart"],
            transformResponse: (response: CartController.Get) => response.cart
        }),
        addToCart: build.mutation<CartController.CartItemDetail, CartController.AddItem>({
            query: (body) => ({
                url: "/cart/add-item",
                method: "PUT",
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(cartApi.util.updateQueryData("getCart", undefined, (draft) => {
                    const newItem: CartController.CartItem = {
                        id: Date.now(),
                        cartId: draft.id,
                        productId: arg.productId,
                        quantity: arg.quantity,
                        price: "0",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        product: {} as CartController.Product,
                        productSize: {} as CartController.ProductSize,
                        productColor: {} as CartController.ProductColor
                    };
                    draft.cartItems.push(newItem);
                }))

                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(cartApi.util.invalidateTags(["Cart"]))
                }
            },
            transformResponse: (response: CartController.Put) => response.data,
            invalidatesTags: ["Cart"]
        }),
        updateCartItem: build.mutation<CartController.UpdatedCartItem, CartController.UpdateItem>({
            query: (body) => ({
                url: "/cart/update-item",
                method: "PATCH",
                body
            }),
            transformResponse: (response: CartController.Patch) => response.updatedCartItem,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(cartApi.util.updateQueryData("getCart", undefined, (draft) => {
                    const item = draft.cartItems.find(item => item.id === arg.cartItemId);
                    if (item) {
                        Object.assign(item, arg);
                        item.updatedAt = new Date().toISOString();
                    }
                }))

                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(cartApi.util.invalidateTags(["Cart"]))
                }
            },
            invalidatesTags: ["Cart"]
        }),
        removeItem: build.mutation<unknown, CartController.RemoveItem>({
            query: (body) => ({
                url: "/cart/remove-item",
                method: "DELETE",
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart', undefined, (draft) => {
                        const index = draft.cartItems.findIndex(item => item.id === arg.cartItemId);
                        if (index !== -1) {
                            draft.cartItems.splice(index, 1);
                        }
                    })
                );

                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(cartApi.util.invalidateTags(["Cart"]))
                }
            },
            invalidatesTags: ["Cart"]
        }),
        clearCart: build.mutation<unknown, CartController.ClearCart>({
            query: (body) => ({
                url: `/cart/${body.cartId}/clear`,
                method: "DELETE",

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart', undefined, (draft) => {
                        draft.cartItems = [];
                    })
                );

                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(cartApi.util.invalidateTags(["Cart"]))
                }
            },
            invalidatesTags: ["Cart"]
        })
    })
})

export const { useAddToCartMutation, useClearCartMutation, useGetCartQuery, useRemoveItemMutation, useUpdateCartItemMutation } = cartApi
export default cartApi