import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function Page() {
  return <Login />;
}
