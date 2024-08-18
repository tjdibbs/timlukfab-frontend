import { Product } from "@lib/types";

export default function sortByPrice(
  a: Product,
  b: Product,
  order: "P-L-H" | "P-H-L"
) {
  let priceA = a.price as number,
    priceB = b.price as number;

  // calculate the discount for product [A] if discountPercentage
  let discountA = a.discountPercentage
    ? (a.discountPercentage / 100) * priceA
    : 1;

  // calculate the discount for product [B] if discountPercentage
  let discountB = b.discountPercentage
    ? (b.discountPercentage / 100) * priceB
    : 1;

  // Minus discount from product price to know the amount to pay by user
  (priceA = priceA - discountA), (priceB = priceB - discountB);

  return order === "P-L-H" ? priceA - priceB : priceB - priceA;
}
