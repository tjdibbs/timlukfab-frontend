import Register from "@/components/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Timlukfab Fashion Store",
  description: "Register to Timlukfab Fashion Store",
};

export default async function Page() {
  return <Register />;
}
