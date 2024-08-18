import ExtractProps from "helpers/extractFilterProps";
import { Product, RouterQuery } from "@lib/types";

export default function matchFilter(
  key: keyof ReturnType<typeof ExtractProps>,
  keyValue: string,
  product: Product
) {
  let pass: boolean;
  switch (key) {
    case "categories":
      let type = keyValue.split(";").filter((t) => t);
      pass = product.category
        ? type.some((categorySelected) => {
            let arr = product.category.split(",").map((s) => s.trim());
            return arr.some((category) => categorySelected.includes(category));
          })
        : false;
      break;
    case "sizes":
    case "colors":
      let productKeyValue = product[key as "sizes" | "colors"] as string,
        value = keyValue.split(";") as (string | number)[];
      value.pop();

      productKeyValue
        ? (pass = Object.keys(JSON.parse(productKeyValue)).some(
            (d: string | number) => value.includes(d)
          ))
        : (pass = false);
      break;
    case "price":
      let prices = keyValue
        .split("-")
        .filter((e) => e)
        .map((e) => Number(e.replaceAll(",", "")));

      pass = product["price"] >= prices[0] && product["price"] <= prices[1];
      break;
    case "availability":
      let availability = keyValue.split(";").filter((e) => e);

      pass = availability.includes("InStock")
        ? product.stock - product.sold > 0
        : product.stock - product.sold <= 0;
      break;
    default:
      pass = false;
      break;
  }

  return pass;
}
