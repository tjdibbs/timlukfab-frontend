"use server"

import { revalidatePath } from "next/cache";

export const revalidatePaths = (paths: string[]) => {
    for (const path of paths) {
        revalidatePath(path);
    }
};