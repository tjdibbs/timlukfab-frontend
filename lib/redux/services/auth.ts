import { z } from "zod";
import { api } from "../api";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";

type RegisterForm = z.infer<typeof RegisterFormSchema>;
type LoginForm = z.infer<typeof LoginFormSchema>;

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (body: RegisterForm) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        loginUser: build.mutation({
            query: (body: LoginForm) => ({
                url: "/auth/login",
                method: "POST",
                body,
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi