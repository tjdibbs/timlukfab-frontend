import BestSelling from "@/components/home/BestSelling";
import BestSellingSkeleton from "@/components/ui/bestselling-skeleton";
import BrowseCategories from "@/components/home/BrowseCategories";
import Carousel from "@/components/home/Carousel";
import Products from "@/components/home/Products";
import Timlukfab from "@/components/home/Timlukfab";
import { getProducts } from "@/lib/actions/products";
import { Suspense } from "react";
import { shuffleArray } from "@/utils/functions";
import ProductsSkeleton from "@/components/ui/product-skeleton";

export default function Page() {
  return (
    <section>
      <Carousel />
      <Suspense fallback={<BestSellingSkeleton />}>
        <BestSellingProducts />
      </Suspense>
      <Suspense fallback={<ProductsSkeleton number={10} />}>
        <ProductsWrapper />
      </Suspense>
      <BrowseCategories />
      <Timlukfab />
    </section>
  );
}

async function ProductsWrapper() {
  const {
    result: { products, hasMore },
  } = await getProducts();

  if (!products.length)
    return <div className="py-8 text-center">No products in store</div>;

  return <Products products={products} hasMore={hasMore} />;
}

async function BestSellingProducts() {
  const {
    result: { products },
  } = await getProducts();

  if (!products.length) return null;

  const shuffled = shuffleArray(products);

  return <BestSelling products={shuffled} />;
}
