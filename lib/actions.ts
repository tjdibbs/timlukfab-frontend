"use server";

import { revalidatePath } from "next/cache";
import { CreateSizeSchema } from "./schemas";
import { z } from "zod";
import { SizesController } from "@/types/sizes";

type CreateSizeFormData = z.infer<typeof CreateSizeSchema>;

export async function createSize(formValues: CreateSizeFormData) {
    const res = await fetch(`${process.env.API_BASE_URL}/sizes/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        throw new Error("Failed to create size");
    }

    const data = await res.json();
    revalidatePath("/admin/sizes");
    return data as SizesController.Put;
}
