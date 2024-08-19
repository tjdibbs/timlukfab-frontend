import { Metadata } from "next";
import { cookies } from "next/headers";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function Page() {
  const token = cookies().get("_u")?.value;
  console.log({ token });

  return <SignIn />;
}
