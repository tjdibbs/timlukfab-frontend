type Product = {
    id: string
    name: string
    price: number
    size: string
    colors: string[]
    stock: number
    category: string
    date: string
}

export const products: Product[] = [
    {
        id: "1",
        name: "Cotton T-Shirt",
        price: 19.99,
        size: "M",
        colors: ["Blue", "Red", "White"],
        stock: 150,
        category: "Clothing",
        date: "2024-09-01",
    },
    {
        id: "2",
        name: "Denim Jacket",
        price: 49.99,
        size: "L",
        colors: ["Black", "Blue"],
        stock: 80,
        category: "Outerwear",
        date: "2024-09-02",
    },
    {
        id: "3",
        name: "Leather Boots",
        price: 89.99,
        size: "10",
        colors: ["Brown", "Black"],
        stock: 40,
        category: "Footwear",
        date: "2024-09-03",
    },
    {
        id: "4",
        name: "Silk Scarf",
        price: 29.99,
        size: "One Size",
        colors: ["Red", "Yellow", "Purple"],
        stock: 200,
        category: "Accessories",
        date: "2024-09-04",
    },
    {
        id: "5",
        name: "Wool Sweater",
        price: 39.99,
        size: "S",
        colors: ["Green", "Gray"],
        stock: 60,
        category: "Clothing",
        date: "2024-09-05",
    },
    {
        id: "6",
        name: "Running Sneakers",
        price: 59.99,
        size: "9",
        colors: ["White", "Black", "Gray"],
        stock: 120,
        category: "Footwear",
        date: "2024-09-06",
    },
    {
        id: "7",
        name: "Baseball Cap",
        price: 14.99,
        size: "Adjustable",
        colors: ["Navy", "Red", "Green"],
        stock: 300,
        category: "Accessories",
        date: "2024-09-07",
    },
    {
        id: "8",
        name: "Yoga Pants",
        price: 34.99,
        size: "M",
        colors: ["Gray", "Black"],
        stock: 90,
        category: "Clothing",
        date: "2024-09-08",
    },
    {
        id: "9",
        name: "Wool Coat",
        price: 129.99,
        size: "L",
        colors: ["Beige", "Black"],
        stock: 30,
        category: "Outerwear",
        date: "2024-09-09",
    },
    {
        id: "10",
        name: "Leather Belt",
        price: 24.99,
        size: "34",
        colors: ["Black", "Brown"],
        stock: 50,
        category: "Accessories",
        date: "2024-09-10",
    },
];
