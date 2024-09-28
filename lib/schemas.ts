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

export const AddAddressSchema = z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    isDefault: z.boolean(),
})

export const OrderSchema = z.object({
    shippingAddressId: z.number().optional(),
    billingAddressId: z.number().optional(),
    orderNote: z.string().optional(),
    useDefaultShippingAddress: z.boolean(),
    useShippingAsBillingAddress: z.boolean()
}).refine(
    (data) => {
        if (!data.useDefaultShippingAddress && !data.shippingAddressId) {
            return false;
        }
        return true;
    },
    {
        message: "Shipping address is required when not using default shipping address",
        path: ['shippingAddressId']
    }
).refine((data) => {
    if (!data.useShippingAsBillingAddress && !data.billingAddressId) {
        return false;
    }
    return true;
}, {
    message: "Billing address is required when not using shipping as billing address",
    path: ['billingAddressId']
});
