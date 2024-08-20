import { Metadata } from "next";
import Collections from "./Collections";

export const metadata: Metadata = {
  title: "Pauloxuries Wears Collection",
  description:
    "Having a collection of fashion wears from variety of brands. Find unique wears to make you stand out. We provide everything fashion",
  openGraph: {
    url: "/collections",
    images: [
      {
        url: "/identity/logo.png",
      },
    ],
  },
};

export default function Page() {
  return <Collections />;
}
