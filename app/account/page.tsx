import { Metadata } from "next";
import Dashboard from "./client";

export const metadata: Metadata = {
  title: "My account | Timlukfab Fashion Store",
};

export default function Page() {
  return <Dashboard />;
}
