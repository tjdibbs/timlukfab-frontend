import axios from "axios";
import ProductPage from "./ProductPage";
import { Product } from "@lib/types";
import { BASE_URL } from "@lib/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { title } from "process";

const getProduct = async (product_id: string) => {
  let product: Product | null = null;
  let error = false;
  try {
    let getProduct = await axios.get<{ product: Product; success: boolean }>(
      BASE_URL + "/api/products/_/" + product_id
    );

    let response = getProduct.data;
    product = response.product;

    // --------------------------
  } catch (error) {
    console.log({ error });
    error = true;
  }

  return {
    product,
    error,
  };
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { id?: string };
}): Promise<Metadata> {
  if (!searchParams.id) {
    return {
      title: "Product not found",
    };
  }

  const { product } = await getProduct(searchParams.id);

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      url: "https://pauloxuries.com",
      images: [
        {
          url: product?.images[0]
            ? "https://pauloxuries.com/images/products/" +
              JSON.parse(product?.images)[0]
            : "",
        },
      ],
    },
  };
}

export default async function page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!searchParams.id) {
    notFound();
  }

  const { product, error } = await getProduct(searchParams.id);

  return <ProductPage error={error} product={product} />;
}
