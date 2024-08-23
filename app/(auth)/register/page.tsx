import { Metadata } from "next";
import { cookies } from "next/headers";
import Register from "./Register";

export const metadata: Metadata = {
  title: "Register | Timlukfab Fashion Store",
  description: "Register to Timlukfab Fashion Store",
};

export default async function Page() {
  // const token = cookies().get("_u")?.value;
  // console.log({ token });

  return <Register />;
}
