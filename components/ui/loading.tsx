"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Settings } from "react-feather";
import { v4 as uuidV4 } from "uuid";

const PageLoader = () => {
  return (
    <AnimatePresence>
      <motion.div
        key={uuidV4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black"
      >
        <Settings className="w-5 animate-spin text-white" />
      </motion.div>
    </AnimatePresence>
  );
};
export default PageLoader;
