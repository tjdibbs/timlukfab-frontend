"use client";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [type, setType] = useState("password");

  return (
    <section>
      <div className="wrapper">
        <form className="mx-auto w-[90%] max-w-sm py-12">
          <div className="text-center">
            <h3 className="mb-4 text-3xl font-semibold max-md:text-2xl">
              Login
            </h3>
            <p className="">Please enter your email and password</p>
          </div>
          <div className="mt-8">
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={type}
                  placeholder="Enter your password"
                  className="w-full rounded border p-2"
                />
                {type === "password" ? (
                  <EyeOutlined
                    style={{ fontSize: "1rem" }}
                    className="absolute right-[3%] top-1/2 -translate-y-1/2 cursor-pointer opacity-85"
                    onClick={() => setType("text")}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "1rem" }}
                    className="absolute right-[3%] top-1/2 -translate-y-1/2 cursor-pointer opacity-85"
                    onClick={() => setType("password")}
                  />
                )}
              </div>
              <p className="mt-1 flex items-center justify-end text-sm">
                <Link
                  href="/forgot-password"
                  className="text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded border bg-black py-3 text-center text-sm font-semibold text-white hover:border-black hover:bg-white hover:text-black"
            >
              LOGIN
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <Link href="/register" className="underline">
              register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
