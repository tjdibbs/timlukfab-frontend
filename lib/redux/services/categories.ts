import { CategoryController } from "@/types/categories";
import { api } from "../api";

const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<CategoryController.Get, undefined>({
            query: () => "/categories"
        })
    })
})

export const { useGetCategoriesQuery } = categoryApi