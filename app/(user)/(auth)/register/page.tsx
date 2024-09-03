import { Metadata } from "next";
import Register from "./Register";

export const metadata: Metadata = {
  title: "Register | Timlukfab Fashion Store",
  description: "Register to Timlukfab Fashion Store",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return <Register />;
}
