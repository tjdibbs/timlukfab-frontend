"use client";

import { CloseOutlined } from "@ant-design/icons";
import {
  createContext,
  Fragment,
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
import { useAppSelector } from "@/lib/redux/store";
import { Skeleton } from "../ui/skeleton";
import CartItem from "./cartItem";
import { calculateCartTotal } from "@/utils/functions";

type Context = {
  open: boolean;
  total: number;
  cartLength: number;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Context>({
  open: false,
  cartLength: 0,
  total: 0,
  openCart: () => {},
  closeCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

const CartSkeleton = () => {
  return (
    <div className="space-y-4 px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div>
          <Skeleton className="my-2 h-36 w-full" />
        </div>
      ))}
    </div>
  );
};

const CartProvider = memo(({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const { data, isLoading, refetch } = useGetCartQuery({});
  const user = useAppSelector(state => state.user);

  const total: number = useMemo(() => {
    return calculateCartTotal(data?.cartItems || []);
  }, [data?.cartItems]);

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
      return <CartSkeleton />;
    }

    return data?.cartItems.map(item => <CartItem key={item.id} item={item} />);
  }, [data]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({ open, openCart, closeCart, cartLength, total }),
    [open, openCart, closeCart, cartLength, total]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {open && (
          <CartOverlay
            id={data?.id}
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
