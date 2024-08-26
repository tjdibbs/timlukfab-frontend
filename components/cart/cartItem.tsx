import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { memo } from "react";

type CartItemProps = {
  item: CartItemType;
  increaseQuantity: (item: CartItemType) => void;
  decreaseQuantity: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
};

const CartItem = memo(
  ({ item, increaseQuantity, decreaseQuantity, removeItem }: CartItemProps) => (
    <div className="flex items-center gap-4 p-5">
      <Image
        src={item.image}
        alt={item.title}
        width={80}
        height={100}
        className="object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.size}</p>
        <p className="font-semibold">${item.price.toLocaleString()}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => decreaseQuantity(item)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span>{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => increaseQuantity(item)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-red-500"
            onClick={() => removeItem(item)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  ),
);

CartItem.displayName = "CartItem";
export default CartItem;
