import { CartInterface } from "@lib/types";

export default function merge<T extends { product_id: string }>(item: T[]) {
  let allKey: string[] = [];
  let uniqueItem: T[] = [];

  item.forEach((t, i) => {
    if (!allKey.includes(t.product_id)) {
      uniqueItem.push(t);
      allKey.push(t.product_id);
    }
  });

  return uniqueItem;
}
