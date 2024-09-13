import { z } from "zod"

export const RegisterFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female"]),
    contact: z.object({
        country: z.string().min(1, "Country is required"),
        text: z.string().refine((val) => /^\d+$/.test(val), {
            message: "Phone number should only contain digits",
        }),
        isoCode: z.string(),
        dialingCode: z.string(),
    }),

    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginFormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export const VerifyEmailSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export const CreateSizeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
})

export const CreateColorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    hexCode: z.string().min(1, "Hex code is required"),
})

export const CreateCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    imageId: z.string().min(1, "Image is required"),
    bannerId: z.string().optional(),
    description: z.string().optional()
})

export const CreateSubCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    imageId: z.string().min(1, "Image is required"),
    categoryId: z.string().min(1, "Category is required"),
    bannerId: z.string().optional(),
    description: z.string().optional()
})

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive").min(1, "Price is required"),
    stock: z.number().positive("Stock must be positive").min(1, "Stock is required"),
    medias: z.array(z.number()).min(1, "At least one media item is required"),
    colors: z.array(
        z.object({
            id: z.number(),
            stock: z.number().positive("Stock must be positive"),
            additionalPrice: z.number().positive("Price must be positive"),
        })
    ).min(1, "At least one color is required"),
    sizes: z.array(
        z.object({
            id: z.number(),
            stock: z.number().positive("Stock must be positive"),
            additionalPrice: z.number().positive("Price must be positive"),
        })
    ).min(1, "At least one size is required"),
    categories: z.array(z.number()).min(1, "At least one media item is required"),
    subcategories: z.array(z.number()),
});
