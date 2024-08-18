import { Product, RouterQuery } from "@lib/types";
import matchFilter from "./matchFilter";
import ExtractProps from "helpers/extractFilterProps";

export default function checkProduct(query: RouterQuery, product: Product) {
  // the required Fields will be checked against product, if it match what user filter for.
  // if user checked categories and size, so the product must match the actual size and categories
  // from the router queries, i am removing brand and sort: because it is not part of filter options
  let requiredFields = Object.keys(query).filter(
    (e) => !["brand", "sort", "shop_by", "name"].includes(e)
  ) as (keyof ReturnType<typeof ExtractProps>)[];

  // the logic here is that, i map through all the requiredField and returned matchedResult to
  // to the array instead of the requiredField, so an array of matchedResult is generated which Boolean[],
  const matchedResults = requiredFields.map((key) =>
    matchFilter(key, query[key], product)
  );

  // then used the every function to check if matchedResults returns true
  return matchedResults.every((isMatched) => isMatched);
}
