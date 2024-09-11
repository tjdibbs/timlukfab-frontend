"use server"

import { Globals } from "@/types/globals";
import { ColorsController } from "@/types/colors";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { CreateColorSchema } from "../schemas";

type CreateColorFormData = z.infer<typeof CreateColorSchema>;

export const getColors = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/colors?pageSize=25`, {
        next: { revalidate: 120, tags: ["Colors"] },
    });
    const data = await res.json();
    return data as ColorsController.Get;
}

export async function createColor(formValues: CreateColorFormData): Promise<Globals.ActionResponse<ColorsController.Put>> {
    const res = await fetch(`${process.env.API_BASE_URL}/colors/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to create color" };
    }

    revalidateTag("Colors")
    return { success: true, message: "Color created successfully" };
}

export async function updateColor(id: string, formValues: CreateColorFormData): Promise<Globals.ActionResponse<ColorsController.Patch>> {
    const res = await fetch(`${process.env.API_BASE_URL}/colors/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to update color" };
    }

    revalidateTag("Colors")
    return { success: true, message: "Color updated successfully" };
}

export async function deleteColor(id: string): Promise<Globals.ActionResponse<ColorsController.Delete>> {
    const res = await fetch(`${process.env.API_BASE_URL}/colors/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete color" };
    }

    revalidateTag("Colors")
    return { success: true, message: "Color deleted successfully" };
}
