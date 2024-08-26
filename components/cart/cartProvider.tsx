"use client";

import { CloseOutlined } from "@ant-design/icons";
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator } from "../ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "@/lib/redux/features/cart";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem as CartItemType } from "@/lib/types";
import CartItem from "./cartItem";
import CartOverlay from "./cartOverlay";

type Context = {
  open: boolean;
  total: number;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Context>({
  open: false,
  total: 0,
  openCart: () => {},
  closeCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = memo(({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const increaseQuantity = useCallback(
    (item: CartItemType) => dispatch(incrementQuantity(item)),
    [dispatch],
  );

  const decreaseQuantity = useCallback(
    (item: CartItemType) => {
      if (item.quantity > 1) {
        dispatch(decrementQuantity(item));
      } else {
        dispatch(removeFromCart(item));
      }
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (item: CartItemType) => dispatch(removeFromCart(item)),
    [dispatch],
  );

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  const cartItems = useMemo(() => {
    if (cart.length === 0) {
      return <p className="p-5 text-center">Your cart is empty</p>;
    }

    return cart.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeItem={removeItem}
      />
    ));
  }, [cart, increaseQuantity, decreaseQuantity, removeItem]);

  const contextValue = useMemo(
    () => ({ open, openCart, closeCart, total }),
    [open, openCart, closeCart, total],
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {open && (
          <CartOverlay
            closeCart={closeCart}
            cartItems={cartItems}
            total={total}
          />
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
});

CartProvider.displayName = "CartProvider";
export default CartProvider;
