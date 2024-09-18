import { ProductController } from "@/types/products";
import { api } from "../api";

interface ProductQuery {
    searchParam?: string
}

const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductController.Product[], ProductQuery>({
            query: ({ searchParam }) => `/products?searchParam=${searchParam || ""}`,
            transformResponse: (response: ProductController.Get) => response.result.products
        }),
        getSingleProduct: build.query({
            query: (id: string) => `/products/${id}`,
            transformResponse: (response: ProductController.GetSingle) => response.product
        })
    })
})

export const { useGetProductsQuery, useGetSingleProductQuery } = productApi