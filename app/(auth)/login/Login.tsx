"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { LoginFormSchema } from "@/lib/schemas";
import useMessage from "@/hooks/useMessage";
import { useLoginUserMutation } from "@/lib/redux/services/auth";
import { ErrorResponse } from "@/lib/types";
import Spinner from "@/components/ui/spinner";

type FormSchema = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    try {
      const response = await loginUser(values);
      console.log(response);
    } catch (error) {
      console.log(error);
      const message =
        (error as ErrorResponse).data.message || "An error occurred";
      alertMessage(message, "error");
    }
  }

  return (
    <section>
      <div className="wrapper">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-md space-y-4 py-12"
          >
            <div className="text-center">
              <h3 className="mb-4 text-3xl font-semibold max-md:text-2xl">
                Login
              </h3>
              <p className="">Please enter your email and password</p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-black hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-xs disabled:opacity-95"
            >
              {isLoading ? <Spinner strokeColor="#fff" /> : "LOGIN"}
            </Button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline">
                register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
