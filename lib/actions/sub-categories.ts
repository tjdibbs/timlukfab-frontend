"use server"

import { SubCategoryController } from "@/types/sub-categories"

export const getSubCategories = async (): Promise<SubCategoryController.Get> => {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories?pageSize=25`, {
        next: { revalidate: 1200, tags: ["SubCategories"] }
    })

    return res.json()
}

export const getSubcategoryProducts = async (id: string, pageNumber?: string) => {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories/${id}/products?pageSize=25&pageNumber=${pageNumber || "1"}`, {
        next: { revalidate: 1200, tags: ["Products"] },
    })

    const data = await res.json();
    return data as SubCategoryController.GetProducts
}

export const getSingleCategory = async (id: string): Promise<SubCategoryController.GetSingle> => {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories/${id}`, {
        next: { revalidate: 300 }
    })

    return res.json()
}

