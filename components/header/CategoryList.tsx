"use client";

import { CategoryController } from "@/types/categories";
import Link from "next/link";
import { memo, MouseEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryList = memo(
  ({
    categories,
    pathname,
  }: {
    categories: CategoryController.Category[];
    pathname: string;
  }) => {
    return (
      <div className="bg-[#fefefe] py-2">
        <div className="wrapper no-scrollbar flex items-center overflow-x-auto">
          {categories.map(category => {
            const isActive = pathname.includes(category.id.toString());
            return (
              <CategoryDropdown
                key={category.id}
                category={category}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

const CategoryDropdown = ({
  category,
  isActive,
}: {
  category: CategoryController.Category;
  isActive: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleMouseOver = () => setOpen(true);
  const handleMouseOut = (e: MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Link
        href={`/categories/${category.id}`}
        className={
          "category-text cursor-pointer whitespace-nowrap rounded px-4 py-1 text-xs font-semibold uppercase hover:bg-gray-100 hover:text-black " +
          (isActive ? "text-black" : "text-gray-700")
        }
      >
        {category.name}
      </Link>
      <AnimatePresence>
        {open && category.subcategories.length > 0 && (
          <motion.div
            className="absolute left-0 top-full block h-44 w-full bg-white px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            role="menuitem"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="space-y-4 py-1">
              {category.subcategories.map(subcategory => (
                <li key={subcategory.id}>
                  <Link
                    href={`/categories/${category.id}/${subcategory.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryList;
