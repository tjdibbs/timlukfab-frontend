"use server"

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { SizesController } from "@/types/sizes";
import { CreateSizeSchema } from "../schemas";
import { Globals } from "@/types/globals";

type CreateSizeFormData = z.infer<typeof CreateSizeSchema>;

export const getSizes = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/sizes/`, {
        next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data as SizesController.Get;
};

export async function createSize(formValues: CreateSizeFormData): Promise<Globals.ActionResponse<SizesController.Put>> {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/sizes/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(formValues),
        });

        if (!res.ok) {
            const errorData = (await res.json()) as Globals.Error;
            return { success: false, message: errorData.message || "Failed to create size" };
        }

        revalidatePath("/admin");
        revalidatePath("/admin/products");
        revalidatePath("/admin/sizes");
        return { success: true, message: "Size created successfully" };
    } catch (error) {
        console.log(error);
        const errorData = (error as Globals.Error).message;
        return { success: false, message: errorData || "Failed to create size" };
    }
}

export async function updateSize(id: string, formValues: CreateSizeFormData): Promise<Globals.ActionResponse<SizesController.Patch>> {
    const res = await fetch(`${process.env.API_BASE_URL}/sizes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to update size" };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/sizes");
    return { success: true, message: "Size updated successfully" };
}

export async function deleteSize(id: string): Promise<Globals.ActionResponse<SizesController.Delete>> {
    const res = await fetch(`${process.env.API_BASE_URL}/sizes/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete size" };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/sizes");
    return { success: true, message: "Size deleted successfully" };
}
