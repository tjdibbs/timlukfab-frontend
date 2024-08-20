import { Metadata } from "next";
import Checkout from "./Checkout";

export const metadata: Metadata = {
  title: `Checkout Product`,
  description: "Checkout your product for shipping and delivering",
  openGraph: {
    url: "https://pauloxuries.com/checkout",
    images: [{ url: "https://pauloxuries.com/identity/dark-logo.png" }],
  },
};

export default function page() {
  return <Checkout />;
}
