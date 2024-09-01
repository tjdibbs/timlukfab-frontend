"use client";

import { SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "react-feather";

const sizes = ["XS", "S", "M", "L", "XL", "2X", "3X"];

const ProductInfo = memo(() => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <motion.section
      className="col-span-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-lg uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
                >
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/shop"
                  className="text-lg uppercase text-[#aaa] hover:text-black/60 max-md:text-sm"
                >
                  SHOP
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <motion.h2
          className="my-6 text-4xl text-black max-md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Black dress with flower neck
        </motion.h2>

        <motion.p
          className="flex items-center gap-2 text-xl max-md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-normal_grey line-through">$250</span>
          <span className="text-dark_grey">$200</span>
        </motion.p>

        <motion.p
          className="my-6 text-base text-normal_grey"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, quae voluptates voluptatibus consequuntur
          quos voluptatem quod quas quidem. Quisquam, quae voluptates
          voluptatibus consequuntur quos voluptatem quod quas quidem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h6 className="mb-6 text-lg">Size</h6>
          <div className="grid grid-cols-5 gap-3">
            {sizes.map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-lg border-2 py-3 text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black hover:bg-black hover:text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </motion.button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <motion.button
              className="flex-1 rounded-3xl bg-black py-3 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to cart
            </motion.button>
            <motion.button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#eee] hover:bg-[#eee]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

ProductInfo.displayName = "ProductInfo";
export default ProductInfo;
