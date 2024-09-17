import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import SidebarMobile from "./sidebar-mobile";
import { Suspense } from "react";
import SidebarSkeleton from "../ui/sidebarskeleton";
import Sidebar from "./sidebar";
import { Skeleton } from "../ui/skeleton";
import {
  getCategoryProducts,
  getSingleCategory,
} from "@/lib/actions/categories";
import ProductsSkeleton from "../ui/product-skeleton";
import PageProducts from "../ui/page-products";
import SelectSorter from "../ui/select-sorter";

type Props = { searchParams: { [key: string]: string | string[] | undefined } };
type Orderby = "date" | "price" | "price-desc";

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

const ProductsWrapper = async ({
  id,
  searchParams,
}: { id: number } & Props) => {
  const pageNumber = searchParams.page as string | undefined;

  const {
    result: { products, hasMore, count },
  } = await getCategoryProducts({
    id: id.toString(),
    pageNumber: pageNumber || "1",
  });

  const orderBy = searchParams.orderby as Orderby | undefined;
  const maxPrice =
    typeof searchParams.max_price === "string"
      ? searchParams.max_price
      : undefined;
  const minPrice =
    typeof searchParams.min_price === "string"
      ? searchParams.min_price
      : undefined;

  let filteredProducts = [...products];

  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) : -Infinity;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    filteredProducts = filteredProducts.filter(product => {
      const price = parseFloat(product.price);
      return price >= min && price <= max;
    });
  }

  if (orderBy) {
    switch (orderBy) {
      case "date":
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price":
        filteredProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case "price-desc":
        filteredProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
    }
  }

  return (
    <PageProducts data={filteredProducts} hasMore={hasMore} count={count} />
  );
};

const Category = ({ id, searchParams }: { id: string } & Props) => {
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
          <SelectSorter searchParams={searchParams} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16 max-md:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsWrapper id={Number(id)} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Category;
