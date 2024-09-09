"use client";

import { CategoryController } from "@/types/categories";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";

export const CategoryLinks = ({
  categories,
}: {
  categories: CategoryController.Category[];
}) => {
  const { id } = useParams() as { id: string };

  return (
    <ul>
      {categories.map(category => {
        const isActive = !!(id === String(category.id));

        return (
          <li key={category.id} className="border-b border-b-gray-200">
            <Link
              href={`/categories/${category.id}`}
              className={clsx(
                "block py-3 text-xs font-semibold uppercase hover:text-black",
                {
                  "text-black": isActive,
                  "text-dark_grey": !isActive,
                }
              )}
            >
              {category.name}
            </Link>
            {isActive ? (
              <SubcategoryLinks subcategories={category.subcategories} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

const SubcategoryLinks = ({
  subcategories,
}: {
  subcategories: CategoryController.SubCategory[];
}) => {
  const { subcategoryId } = useParams();
  return (
    <ul className="mb-2 space-y-2 pl-6">
      {subcategories.map(subcategory => {
        const isActive = !!(subcategory.id.toString() === subcategoryId);
        return (
          <li key={subcategory.id}>
            <Link
              href={`/categories/${subcategory.categoryId}/subcategories/${subcategory.id}`}
              className={clsx(
                "block text-xs font-semibold uppercase hover:text-black",
                { "text-black": isActive, "text-gray-400": !isActive }
              )}
            >
              {subcategory.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
