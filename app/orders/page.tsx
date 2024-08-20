import { Metadata } from "next";
import Orders from "./Orders";

export const metadata: Metadata = {
  title: `Orders`,
  description: "Track and Cancel your pending and completed order",
  openGraph: {
    url: "https://pauloxuries.com/orders",
    images: [{ url: "https://pauloxuries.com/identity/dark-logo.png" }],
  },
};

export default function Page() {
  return <Orders />;
}
