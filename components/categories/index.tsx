import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import SidebarMobile from "./sidebar-mobile";
import { Suspense } from "react";
import SidebarSkeleton from "../ui/sidebarskeleton";
import Sidebar from "./sidebar";
import Products from "./products";
import { Skeleton } from "../ui/skeleton";
import { getSingleCategory } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import ProductsSkeleton from "../ui/product-skeleton";

const BreadCrumbSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
    </div>
  );
};

const BreadCrumb = async ({ id }: { id: string }) => {
  const { category } = await getSingleCategory(id);

  const breadCrumbLinks: BreadCrumbLink[] = [
    {
      id: 1,
      name: "Home",
      href: "/",
      isPage: false,
    },
    {
      id: 2,
      name: "Categories",
      href: "/categories",
      isPage: false,
      isClickable: false,
    },
    {
      id: 3,
      name: category.name,
      href: `/categories/${id}`,
      isPage: true,
    },
  ];

  return <BreadCrumbComponent links={breadCrumbLinks} />;
};

const ProductsWrapper = async ({ id }: { id: number }) => {
  const {
    result: { products, hasMore },
  } = await getProducts();

  const sorted = products.filter(product =>
    product.categories.some(category => category.id === id)
  );

  return <Products data={sorted} hasMore={hasMore} />;
};

const Category = ({ id }: { id: string }) => {
  return (
    <div>
      <div className="mb-8 flex items-center max-md:flex-col max-md:gap-4 md:justify-between">
        <div>
          <Suspense fallback={<BreadCrumbSkeleton />}>
            <BreadCrumb id={id} />
          </Suspense>
        </div>
        <SidebarMobile />
        <div className="flex items-center justify-end gap-8">
          <p className="text-[#777] max-md:hidden">
            Showing 1–12 of 23 results
          </p>
          <div>
            <select
              defaultValue={"default"}
              className="w-40 cursor-pointer rounded-sm border border-x-gray-200 bg-gray-100 p-2 px-3 focus:outline-none max-md:px-2 max-md:text-sm"
            >
              <option value="default">Default sorting</option>
              <option value="popularity">Sort by popularity</option>
              <option value="rating">Sort by average rating</option>
              <option value="latest">Sort by latest</option>
              <option value="price">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16 max-md:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsWrapper id={Number(id)} />
        </Suspense>
      </div>
    </div>
  );
};

export default Category;
