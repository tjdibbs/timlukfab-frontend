
import { StaticImageData } from "next/image";
import { User } from "@/lib/types";

interface AccountLink {
    id: number;
    name: string;
    path: string;
}

export interface Product {
    id: string | number;
    name: string;
    price: number;
    image: StaticImageData | string;
}

export const accountLinks: AccountLink[] = [
    {
        id: 1,
        name: "Dashboard",
        path: "/account",
    },
    {
        id: 2,
        name: "Orders",
        path: "/account/orders",
    },
    {
        id: 3,
        name: "Addresses",
        path: "/account/addresses",
    },
    {
        id: 4,
        name: "Account details",
        path: "/account/account-details",
    },
    {
        id: 5,
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