import { z } from "zod";
import { api } from "../api";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";
import { RegisterResponse } from "@/lib/types";

type ZodRegisterForm = z.infer<typeof RegisterFormSchema>;
type LoginForm = z.infer<typeof LoginFormSchema>;

interface RegisterForm extends ZodRegisterForm {
    country: string;
}

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation<RegisterResponse, RegisterForm>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            })
        }),
        loginUser: build.mutation({
            query: (body: LoginForm) => ({
                url: "/auth/login",
                method: "POST",
                body,
            })
        })
    }),
    overrideExisting: false
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi