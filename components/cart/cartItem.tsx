import { CartController } from "@/types/cart";
import { Button } from "../ui/button";
import {
  ChevronDown,
  DeleteIcon,
  Heart,
  Minus,
  MinusIcon,
  Plus,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { CSSProperties, Fragment, memo, useCallback, useState } from "react";
import { calculateCartItemAdditionalPrice } from "@/utils/functions";
import Modal from "../ui/modal";
import Link from "next/link";
import { ProductController } from "@/types/products";
import EditCartItem from "./editCartItem";
import {
  useRemoveItemMutation,
  useUpdateCartItemMutation,
} from "@/lib/redux/services/cart";
import useMessage from "@/hooks/useMessage";
import { TailwindSpinner } from "../ui/spinner";

type Props = {
  item: CartController.CartItem;
};

const CartItem = memo(({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  const [updateCart, { isLoading }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: isPending }] = useRemoveItemMutation();

  const { alertMessage } = useMessage();

  const handleUpdateCart = async ({
    type,
  }: {
    type: "increment" | "decrement";
  }) => {
    try {
      let quantity = item.quantity;

      const productStock = item.product.stock;
      const quantityIsOne = item.quantity === 1;

      if (type === "increment") {
        if (item.quantity < productStock) {
          quantity += 1;
        } else {
          return;
        }
      }

      if (type === "decrement") {
        if (quantityIsOne) return;
        quantity -= 1;
      }

      const payload: CartController.UpdateItem = {
        cartItemId: item.id,
        quantity: quantity,
        productColorId: item.productColor.id,
        productSizeId: item.productSize.id,
      };

      await updateCart(payload).unwrap();
    } catch (error) {
      alertMessage("Something went wrong", "error");
    }
  };

  const handleDeleteItem = async () => {
    try {
      const payload: CartController.RemoveItem = {
        cartItemId: item.id,
      };

      await removeItem(payload).unwrap();
      alertMessage("Item deleted successfully", "success");
    } catch (error) {
      console.log(error);
      alertMessage("Something went wrong", "error");
    }
  };

  return (
    <Fragment>
      <div className="mx-auto flex w-[95%] items-center gap-4 border-b border-b-gray-100 py-4">
        <div className="w-24">
          <Image
            src={item.product.medias[0].path}
            alt={item.product.name}
            priority
            height={100}
            width={100}
            className="aspect-[4/6] w-full object-cover"
          />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between">
              <h5 className="text-xs text-black">{item.product.name}</h5>
              {isLoading && <TailwindSpinner className="h-4 w-4" />}
            </div>
            <p className="text-base font-medium text-red-800">
              ${item.price} +
              <span className="text-gray-700">
                ${calculateCartItemAdditionalPrice(item)}
              </span>
            </p>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={handleOpen}
              className="mt-2 flex items-center gap-2 text-xs"
            >
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  Size: <span>{item.productSize.size.name}</span>
                </div>
                <Minus
                  size={16}
                  color="#4b5563"
                  className="rotate-90 transform text-gray-600"
                />
                <div className="flex items-center gap-1">
                  Color:
                  <div
                    style={{ backgroundColor: item.productColor.color.hexCode }}
                    className="h-3 w-3 rounded-full"
                  />
                </div>
              </div>
              <ChevronDown size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex max-w-40 items-center">
              <Button
                size={"icon"}
                disabled={isLoading || isPending}
                variant={"ghost"}
                className="flex-1"
                onClick={() => handleUpdateCart({ type: "decrement" })}
              >
                <MinusIcon size={20} />
              </Button>
              <div className="flex flex-[2] items-center justify-center">
                {item.quantity}
              </div>
              <Button
                size={"icon"}
                disabled={isLoading || isPending}
                variant={"ghost"}
                className="flex-1"
                onClick={() => handleUpdateCart({ type: "increment" })}
              >
                <PlusIcon size={20} />
              </Button>
            </div>
            <Button
              variant={"ghost"}
              disabled={isLoading || isPending}
              onClick={handleDeleteItem}
            >
              {isPending ? (
                <TailwindSpinner className="h-4 w-4" />
              ) : (
                <DeleteIcon size={20} color="crimson" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={item.product.name}
        description="Edit your cart item"
        maxWidth="sm:max-w-xl max-sm:max-w-sm"
      >
        <EditCartItem item={item} closeFn={handleClose} />
      </Modal>
    </Fragment>
  );
});

CartItem.displayName = "CartItem";
export default CartItem;
