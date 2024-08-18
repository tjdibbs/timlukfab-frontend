import { Product } from "@lib/types";
import sortByPrice from "@helper/sortByPrice";

export default function SortFunc(
  this: { sortValue: string },
  products: Product[]
) {
  let sortValue = this.sortValue;

  switch (sortValue) {
    case "Z-A":
      return [...products.sort((a, b) => b.title.localeCompare(a.title))];
    case "A-Z":
      return [...products.sort((a, b) => a.title.localeCompare(b.title))];
    case "P-L-H":
      return [...products.sort((a, b) => sortByPrice(a, b, "P-L-H"))];
    case "P-H-L":
      return [...products.sort((a, b) => sortByPrice(a, b, "P-H-L"))];
    case "D-N-O":
      return [
        ...products.sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        ),
      ];
    case "D-O-N":
      return [
        ...products.sort(
          (a, b) =>
            Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
        ),
      ];
    default:
      return products;
  }
}
