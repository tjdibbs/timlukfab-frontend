import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";
import { Suspense } from "react";
import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import SidebarSkeleton from "../ui/sidebarskeleton";
import ProductsSkeleton from "../ui/product-skeleton";
import { getProducts } from "@/lib/actions/products";
import SelectSorter from "../ui/select-sorter";
import PageProducts from "../ui/page-products";

const breadCrumbLinks: BreadCrumbLink[] = [
  {
    id: 1,
    name: "Home",
    href: "/",
    isPage: false,
  },
  {
    id: 2,
    name: "Shop",
    href: "/shop",
    isPage: true,
  },
];

type Props = { searchParams: { [key: string]: string | string[] | undefined } };
type Orderby = "date" | "price" | "price-desc";

const Shop = ({ searchParams }: Props) => {
  return (
    <div>
      <div className="mb-8 flex items-center max-md:flex-col max-md:gap-4 md:justify-between">
        <div>
          <BreadCrumbComponent links={breadCrumbLinks} />
        </div>
        <SidebarMobile />
        <div className="flex items-center justify-end gap-8">
          {/* <p className="text-[#777] max-md:hidden">Showing All Products</p> */}
          <SelectSorter searchParams={searchParams} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16 max-md:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

const ProductsWrapper = async ({ searchParams }: Props) => {
  const {
    result: { products, hasMore },
  } = await getProducts();

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

  return <PageProducts data={filteredProducts} hasMore={hasMore} />;
};

export default Shop;
