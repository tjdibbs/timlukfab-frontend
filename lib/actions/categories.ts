"use server"

import { CategoryController } from "@/types/categories";
import { Globals } from "@/types/globals";
import { z } from "zod";
import { CreateCategorySchema } from "../schemas";
import { revalidatePath } from "next/cache";

type CreateFormData = z.infer<typeof CreateCategorySchema>
export const getCategories = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/categories/`, {
        next: { revalidate: 3600 },
    })

    const data = await res.json()
    return data as CategoryController.Get
}

export const getSingleCategory = async (id: string) => {
    const res = await fetch(`${process.env.API_BASE_URL}/categories/${id}`)

    const data = await res.json();
    return data as CategoryController.GetSingle
}

export const createCategory = async (formValues: CreateFormData): Promise<Globals.ActionResponse<CategoryController.PUT>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/categories/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ ...formValues, imageId: Number(formValues.imageId), bannerId: formValues.bannerId ? Number(formValues.bannerId) : null }),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to create category" };
    }

    revalidatePath("/")
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/create");
    return { success: true, message: "Category created successfully" };
}

export const updateCategory = async (id: string, formValues: CreateFormData): Promise<Globals.ActionResponse<CategoryController.Patch>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ ...formValues, imageId: Number(formValues.imageId), bannerId: formValues.bannerId ? Number(formValues.bannerId) : null }),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to update category" };
    }

    revalidatePath("/")
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/create");
    return { success: true, message: "Category updated successfully" };
}

export async function deleteCategory(id: string): Promise<Globals.ActionResponse<CategoryController.Delete>> {
    const res = await fetch(`${process.env.API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete category" };
    }

    revalidatePath("/")
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/create");
    return { success: true, message: "Category deleted successfully" };
}
