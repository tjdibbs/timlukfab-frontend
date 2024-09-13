"use server"

import { ProductController } from "@/types/products";
import { z } from "zod";
import { CreateProductSchema } from "../schemas";
import { Globals } from "@/types/globals";
import { revalidatePath, revalidateTag } from "next/cache";

type CreateFormSchema = z.infer<typeof CreateProductSchema>
export const getProducts = async (): Promise<ProductController.Get> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products?pageSize=25`, {
        next: {
            revalidate: 1200,
            tags: ["Products"],
        },
    })

    return res.json()
}

// export const getProductsForSpecificCategory = async (id: number): Promise<ProductController.Product[]> => {
//     const res = await fetch(`${process.env.API_BASE_URL}/products?pageSize=25`, {
//         next: {
//             revalidate: 100
//         },
//     })

//     const data: ProductController.Get = await res.json()
//     const { result: { products } } = data

//     return []
// }

export const getSingleProduct = async (id: string): Promise<ProductController.GetSingle> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
        next: { revalidate: 300 }
    })

    return res.json()
}

export const createProduct = async (formValues: CreateFormSchema): Promise<Globals.ActionResponse<ProductController.Put>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to create product" };
    }

    revalidateTag("Products")
    revalidatePath("/")
    revalidatePath("/products/[id]", "page")
    revalidatePath("/categories/[id]", "page")
    revalidatePath("/categories/[id]/subcategories/[subcategoryId]", "page")
    return { success: true, message: "Product created successfully" };
}

export const updateProduct = async (id: string, formValues: CreateFormSchema): Promise<Globals.ActionResponse<ProductController.Patch>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(formValues),
    })

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to update product" };
    }

    revalidateTag("Products")
    revalidatePath("/")
    revalidatePath("/products/[id]", "page")
    revalidatePath("/categories/[id]", "page")
    revalidatePath("/categories/[id]/subcategories/[subcategoryId]", "page")
    return { success: true, message: "Product updated successfully" };
}

export async function deleteProduct(id: string): Promise<Globals.ActionResponse<ProductController.Delete>> {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete product" };
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/products")
    revalidatePath("/admin/products/create")
    revalidatePath("/products/[id]", "page")
    revalidatePath("/categories/[id]", "page")
    revalidatePath("/categories/[id]/subcategories/[subcategoryId]", "page")
    return { success: true, message: "Product deleted successfully" };
}
