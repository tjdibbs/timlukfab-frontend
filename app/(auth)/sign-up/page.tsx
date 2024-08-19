import { Metadata } from "next";
import SignUp from "./SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
};

export default function Page() {
  return <SignUp />;
}
