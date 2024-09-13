"use server"

import { Globals } from "@/types/globals";
import { FileController } from "@/types/files";
import { revalidatePath, revalidateTag } from "next/cache";

export const getFiles = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/files/`, {
        next: { revalidate: 1200, tags: ["Files"] },
    });
    const data = await res.json();
    return data as FileController.Get;
}

export const uploadFile = async (formData: FormData): Promise<Globals.ActionResponse<FileController.Post>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/files/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to upload files" };
    }

    revalidateTag("Files")
    return { success: true, message: "Files uploaded successfully" };
}

export const deleteFile = async (id: string): Promise<Globals.ActionResponse<FileController.Delete>> => {
    const res = await fetch(`${process.env.API_BASE_URL}/files/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = (await res.json()) as Globals.Error;
        return { success: false, message: errorData.message || "Failed to delete image" };
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/media")
    revalidatePath("/admin/products")
    revalidatePath("/admin/products/create")
    return { success: true, message: "Image deleted successfully" };
}