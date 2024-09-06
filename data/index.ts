import { v4 as uuidV4 } from "uuid";

import product1 from "@/assets/images/products/product1.jpg";
import product2 from "@/assets/images/products/product2.jpg";
import product3 from "@/assets/images/products/product3.jpg";
import product4 from "@/assets/images/products/product4.jpg";
import product5 from "@/assets/images/products/product5.jpg";
import product6 from "@/assets/images/products/product6.jpg";
import product7 from "@/assets/images/products/product7.jpg";
import product8 from "@/assets/images/products/product8.jpg";
import product9 from "@/assets/images/products/product9.jpg";
import product10 from "@/assets/images/products/product10.jpg";
import product11 from "@/assets/images/products/product11.jpg";
import product12 from "@/assets/images/products/product12.jpg";
import product13 from "@/assets/images/products/product13.jpg";
import product14 from "@/assets/images/products/product14.jpg";
import product15 from "@/assets/images/products/product15.jpg";
import { StaticImageData } from "next/image";
import { User } from "@/lib/types";

interface AccountLink {
    id: string;
    name: string;
    path: string;
}

export interface Product {
    id: string | number;
    name: string;
    price: number;
    image: StaticImageData | string;
}

export const products: Product[] = [
    { id: 1, name: "Floral Summer Dress", price: 29.99, image: product1 },
    { id: 2, name: "Casual Denim Jacket", price: 59.99, image: product2 },
    { id: 3, name: "Knit Sweater", price: 39.99, image: product3 },
    { id: 4, name: "High-Waisted Jeans", price: 49.99, image: product4 },
    { id: 5, name: "Silk Blouse", price: 45.99, image: product5 },
    { id: 6, name: "Pleated Midi Skirt", price: 34.99, image: product6 },
    { id: 7, name: "Leather Moto Jacket", price: 79.99, image: product7 },
    { id: 8, name: "Wrap Dress", price: 54.99, image: product8 },
    { id: 9, name: "Ankle Boots", price: 69.99, image: product9 },
    { id: 10, name: "Basic Tee", price: 19.99, image: product10 },
    { id: 11, name: "Oversized Cardigan", price: 49.99, image: product11 },
    { id: 12, name: "Maxi Dress", price: 59.99, image: product12 },
    { id: 13, name: "Tailored Blazer", price: 89.99, image: product13 },
    { id: 14, name: "Sport Leggings", price: 29.99, image: product14 },
    { id: 15, name: "Wool Coat", price: 119.99, image: product15 }
];

export const accountLinks: AccountLink[] = [
    {
        id: uuidV4(),
        name: "Dashboard",
        path: "/account",
    },
    {
        id: uuidV4(),
        name: "Orders",
        path: "/account/orders",
    },
    {
        id: uuidV4(),
        name: "Addresses",
        path: "/account/addresses",
    },
    {
        id: uuidV4(),
        name: "Account details",
        path: "/account/account-details",
    },
    {
        id: uuidV4(),
        name: "Wishlist",
        path: "/account/wishlist",
    }
];

export interface Order {
    id: number;
    customerName: string;
    totalAmount: number;
    status: string;
}

export const orders: Order[] = [
    {
        id: 1,
        customerName: "John Doe",
        totalAmount: 150.75,
        status: "Pending",
    },
    {
        id: 2,
        customerName: "Jane Smith",
        totalAmount: 200.50,
        status: "Shipped",
    },
    {
        id: 3,
        customerName: "Alice Johnson",
        totalAmount: 320.00,
        status: "Delivered",
    },
    {
        id: 4,
        customerName: "Bob Brown",
        totalAmount: 75.25,
        status: "Cancelled",
    },
    {
        id: 5,
        customerName: "Charlie Davis",
        totalAmount: 500.00,
        status: "Processing",
    },
];

export const customers: User[] = [
    {
        fullName: "John Doe",
        id: 1,
        userType: "customer",
        firstName: "John",
        lastName: "Doe",
        imageUrl: null,
        gender: "male",
        contactId: 101,
        country: "USA",
        email: "john.doe@example.com",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
        contact: {
            text: "123 Main St, Anytown, USA",
            country: "USA",
            isoCode: "US",
            dialingCode: "+1",
        },
        verified: true,
    },
    {
        fullName: "Jane Smith",
        id: 2,
        userType: "customer",
        firstName: "Jane",
        lastName: "Smith",
        imageUrl: null,
        gender: "female",
        contactId: 102,
        country: "Canada",
        email: "jane.smith@example.com",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
        contact: {
            text: "456 Elm St, Anytown, Canada",
            country: "Canada",
            isoCode: "CA",
            dialingCode: "+1",
        },
        verified: true,
    },
    // Add more customers as needed
];

export interface Category {
    id: number;
    name: string;
    subcategories: string[];
}

export const categories: Category[] = [
    {
        id: 1,
        name: "Tops",
        subcategories: ["Blouses", "T-Shirts", "Sweaters", "Tank Tops"],
    },
    {
        id: 2,
        name: "Bottoms",
        subcategories: ["Jeans", "Skirts", "Shorts", "Leggings"],
    },
    {
        id: 3,
        name: "Dresses",
        subcategories: ["Casual Dresses", "Evening Dresses", "Party Dresses", "Maxi Dresses"],
    },
    {
        id: 4,
        name: "Outerwear",
        subcategories: ["Jackets", "Coats", "Blazers", "Cardigans"],
    },
    {
        id: 5,
        name: "Accessories",
        subcategories: ["Bags", "Belts", "Hats", "Scarves"],
    },
    {
        id: 6,
        name: "Footwear",
        subcategories: ["Sandals", "Heels", "Boots", "Sneakers"],
    },
    // Add more categories as needed
];