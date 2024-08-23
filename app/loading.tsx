"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SettingOutlined } from "@ant-design/icons";
import { v4 as uuidV4 } from "uuid";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        key={uuidV4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen bg-black flex items-center justify-center w-full z-[9999999]"
      >
        <SettingOutlined className="w-5 animate-spin" />
      </motion.div>
    </AnimatePresence>
  );
}
