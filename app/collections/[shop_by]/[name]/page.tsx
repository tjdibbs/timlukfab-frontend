import { Metadata } from "next";
import Name from "./Name";

type Params = {
  params: {
    shop_by: string;
    name: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Products from ${params.name} ${params.shop_by}`,
    description: `Brands and Categories of product we have in the store. Get the best fit by category or your favorite brand with their verified products.`,
    openGraph: {
      url: `https://pauloxuries.com/${params.shop_by}/${params.name}/`,
      images: [
        {
          url: "https://pauloxuries.com/identity/dark-logo.png",
        },
      ],
    },
  };
}

export default function Page() {
  return <Name />;
}
