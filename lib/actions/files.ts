"use server"

import { Globals } from "@/types/globals";
import { FileController } from "@/types/files";
import { revalidatePath } from "next/cache";

export const getFiles = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/files/`, {
        next: { revalidate: 3600 },
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
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/media");
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
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/admin/media");
    return { success: true, message: "Image deleted successfully" };
}