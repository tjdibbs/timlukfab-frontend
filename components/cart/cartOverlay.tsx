import { CloseOutlined } from "@ant-design/icons";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { CSSProperties, memo } from "react";

type CartOverlayProps = {
  closeCart: () => void;
  cartItems: React.ReactNode;
  total: number;
};

const style: CSSProperties = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
};

const CartOverlay = memo(
  ({ closeCart, cartItems, total }: CartOverlayProps) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-[9999999] h-screen w-full bg-black/50"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={style}
        className="full-height fixed right-0 top-0 z-[9999999] w-full max-w-[400px] bg-white"
      >
        <header>
          <div className="flex items-center justify-between p-6 px-5">
            <h3 className="text-xl font-semibold">Cart</h3>
            <button onClick={closeCart}>
              <CloseOutlined style={{ fontSize: "1.25rem" }} />
            </button>
          </div>
          <Separator />
          <p className="px-5 py-2 font-light">
            You are eligible for free shipping!
          </p>
          <Separator />
        </header>
        <div className="flex-1 overflow-y-auto">{cartItems}</div>
        <footer>
          <Separator />
          <div className="p-5">
            <p className="mb-4 text-sm text-gray-600">
              Shipping & taxes calculated at checkout
            </p>
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              CHECKOUT • ${total.toLocaleString()}
            </Button>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  ),
);

CartOverlay.displayName = "CartOverlay";
export default CartOverlay;
