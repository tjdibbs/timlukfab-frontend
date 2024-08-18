import { Product } from "@lib/types";

export default function ExtractProps(products: Product[]) {
  const sizes = countDuplicates(products, "sizes");
  const colors = countDuplicates(products, "colors");

  const availability = products.reduce<{ InStock: number; OutOfStock: number }>(
    (availability, product) => {
      if (product?.stock - product.sold > 0) availability.InStock += 1;
      else availability.OutOfStock += 1;

      return availability;
    },
    { InStock: 0, OutOfStock: 0 }
  );

  const price = products.reduce<{ [x in "highest" | "lowest"]: number }>(
    (priceRange, product, index) => {
      if (!index) {
        return {
          lowest: product.price as number,
          highest: product.price as number,
        };
      } else if (product.price > priceRange.highest)
        priceRange.highest = product.price as number;
      else if (product.price < priceRange.lowest)
        priceRange.lowest = product.price as number;

      return priceRange;
    },
    { lowest: 0, highest: 0 }
  );

  const categories = countDuplicates(products, "category");

  return {
    sizes,
    availability,
    price,
    colors,
    categories,
  };
}

function countDuplicates(
  pr: Product[],
  productField: "sizes" | "colors" | "category"
) {
  console.log({ pr });
  return pr
    .reduce<string[]>((d, p) => {
      if (p[productField]) {
        let val;

        if (productField === "category") val = p[productField].split(",");
        else val = Object.keys(JSON.parse(p[productField]));

        return d.concat(val);
      } else return d;
    }, [])
    .map((a) => toLowCase(a))
    .sort()
    .reduce<{ [x: string]: number }>((d, v) => {
      // return the same object if the size is empty | undefined
      if (!v) return d;

      // get all the size that has been generated, note that size are use as the object keys
      let keys = Object.keys(d);

      if (keys.includes(v)) {
        // if size already exist object, update it's count by 1
        d = { ...d, [v]: d[v] + 1 };

        // if it doesn't exist, we add it to the reduce object
      } else d = { ...d, [v]: 1 };

      return d;
    }, {});
}

function toLowCase(a: string): string {
  return a.trim().toLowerCase();
}
