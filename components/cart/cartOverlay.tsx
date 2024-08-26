import { CloseOutlined } from "@ant-design/icons";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { memo } from "react";

type CartOverlayProps = {
  closeCart: () => void;
  cartItems: React.ReactNode;
  total: number;
};

const CartOverlay = memo(
  ({ closeCart, cartItems, total }: CartOverlayProps) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-[999999] h-screen w-full bg-black/50"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 z-[9999999] flex h-screen w-full max-w-[400px] flex-col bg-white"
      >
        <header className="flex items-center justify-between p-6 px-5">
          <h3 className="text-xl font-semibold">Cart</h3>
          <button onClick={closeCart}>
            <CloseOutlined style={{ fontSize: "1.25rem" }} />
          </button>
        </header>
        <Separator />
        <p className="px-5 py-2 font-light">
          You are eligible for free shipping!
        </p>
        <Separator />
        <div className="flex-1 overflow-y-auto">{cartItems}</div>
        <Separator />
        <div className="p-5">
          <p className="mb-4 text-sm text-gray-600">
            Shipping & taxes calculated at checkout
          </p>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            CHECKOUT • ${total.toLocaleString()}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  ),
);

CartOverlay.displayName = "CartOverlay";
export default CartOverlay;
