import { Metadata } from "next";
import Register from "./Register";
import GuestRoute from "@/components/providers/GuestRoute";

export const metadata: Metadata = {
  title: "Register | Timlukfab Fashion Store",
  description: "Register to Timlukfab Fashion Store",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return <Register />;
}
