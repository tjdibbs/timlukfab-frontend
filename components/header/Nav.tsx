"use client";

import { categories } from "@/lib/constants";
import { setFixedBody } from "@/utils/functions";
import { FacebookFilled, InstagramFilled, XOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect } from "react";
import { X } from "react-feather";
import { v4 as uuidV4 } from "uuid";

type Props = {
  isOpen: boolean;
  closeFn: () => void;
};

const style: CSSProperties = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
};

const Nav = ({ isOpen, closeFn }: Props) => {
  useEffect(() => {
    if (isOpen) {
      setFixedBody(true); // Disable scrolling
    } else {
      setFixedBody(false); // Enable scrolling
    }
    return () => {
      setFixedBody(false); // Clean up on unmount
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center bg-black/50 md:hidden ${isOpen ? "block" : "hidden"}`}
    >
      <AnimatePresence>
        <motion.div
          key={uuidV4()}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
          style={style}
          className="h-full w-[75%] max-w-[500px] bg-white shadow-md"
        >
          <header className="px-3 py-3">
            <button onClick={closeFn}>
              <X className="w-8 text-black" />
            </button>
          </header>
          <section className="no-scrollbar h-full overflow-y-scroll">
            {categories.map((category, index) => (
              <p
                key={uuidV4()}
                className={
                  "cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100 " +
                  (index === 0 ? "text-primary-100" : "text-neutral-110")
                }
              >
                {category}
              </p>
            ))}
          </section>
          <footer className="flex items-center gap-4 p-3">
            <a href="/">
              <XOutlined style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
            <a href="/">
              <InstagramFilled style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
            <a href="/">
              <FacebookFilled style={{ fontSize: "1rem", color: "#808080" }} />
            </a>
          </footer>
        </motion.div>
      </AnimatePresence>
      <div className="h-screen flex-1" onClick={closeFn}></div>
    </nav>
  );
};

export default Nav;
