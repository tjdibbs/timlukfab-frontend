"use server"

import { ProductController } from "@/types/products";

export const getProducts = async (pageNumber?: string): Promise<ProductController.Get> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products?pageSize=25&pageNumber=${pageNumber || "1"}`, {
        next: {
            revalidate: 1200,
            tags: ["Products"],
        },
    })

    return res.json()
}


export const getSingleProduct = async (id: string): Promise<ProductController.GetSingle> => {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
        next: { revalidate: 300 }
    })

    return res.json()
}
