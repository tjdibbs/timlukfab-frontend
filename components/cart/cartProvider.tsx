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
import { AnimatePresence } from "framer-motion";
import CartOverlay from "./cartOverlay";
import { useGetCartQuery } from "@/lib/redux/services/cart";

type Context = {
  open: boolean;
  cartLength: number;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Context>({
  open: false,
  cartLength: 0,
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

  const { data, isLoading } = useGetCartQuery({});

  const cartLength = useMemo(() => data?.cartItems.length || 0, [data]);

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  const cartItems = useMemo(() => {
    if (data?.cartItems.length === 0) {
      return <p className="p-5 text-center">Your cart is empty</p>;
    }

    if (isLoading) {
      return <p className="p-5 text-center">Loading...</p>;
    }

    return data?.cartItems.map(item => (
      <p key={item.id}>{item.product.name}</p>
    ));
  }, [data]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const contextValue = useMemo(
    () => ({ open, openCart, closeCart, cartLength }),
    [open, openCart, closeCart, cartLength]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {open && <CartOverlay closeCart={closeCart} cartItems={cartItems} />}
      </AnimatePresence>
    </CartContext.Provider>
  );
});

CartProvider.displayName = "CartProvider";
export default CartProvider;
