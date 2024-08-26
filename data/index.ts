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
