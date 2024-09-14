"use server"

import { Globals } from "@/types/globals"
import { SubCategoryController } from "@/types/sub-categories"
import { z } from "zod"
import { CreateSubCategorySchema } from "../schemas"
import { revalidatePath, revalidateTag } from "next/cache"

type CreateFormData = z.infer<typeof CreateSubCategorySchema>
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

export const createCategory = async (formValues: CreateFormData): Promise<Globals.ActionResponse<SubCategoryController.PUT>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ ...formValues, imageId: Number(formValues.imageId), bannerId: formValues.bannerId ? Number(formValues.bannerId) : null, categoryId: Number(formValues.categoryId) }),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to create subcategory" };
    }

    revalidateTag("SubCategories")
    return { success: true, message: "Sub Category created successfully" };
}

export const updateCategory = async (id: string, formValues: CreateFormData): Promise<Globals.ActionResponse<SubCategoryController.Patch>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ ...formValues, imageId: Number(formValues.imageId), bannerId: formValues.bannerId ? Number(formValues.bannerId) : null, categoryId: Number(formValues.categoryId) }),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to update category" };
    }

    revalidateTag("SubCategories")
    return { success: true, message: "Category updated successfully" };
}

export async function deleteCategory(id: string): Promise<Globals.ActionResponse<SubCategoryController.Delete>> {
    const res = await fetch(`${process.env.API_BASE_URL}/sub-categories/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete category" };
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/sub-categories")
    revalidatePath("/admin/products")
    revalidatePath("/admin/products/create")
    return { success: true, message: "Category deleted successfully" };
}


