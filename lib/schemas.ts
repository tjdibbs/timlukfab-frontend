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