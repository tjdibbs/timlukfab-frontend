"use server"

import { UserController } from "@/types/users";

export const getUsers = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/users/`, {
        next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data as UserController.Get;
}