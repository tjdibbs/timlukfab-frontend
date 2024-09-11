import ImageShow from "@/components/products/image-show";
import ProductData from "@/components/products/productdata";
import ProductInfo from "@/components/products/productInfo";
import RelatedProducts from "@/components/products/relatedproducts";
import ProductsSkeleton from "@/components/ui/product-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, getSingleProduct } from "@/lib/actions/products";
import { Fragment, Suspense } from "react";

export const generateStaticParams = async () => {
  const {
    result: { products },
  } = await getProducts();
  return products.map(product => ({
    id: product.id.toString(),
  }));
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className="py-4">
      <div className="wrapper">
        <Suspense fallback={<SkeletonLoader />}>
          <ProductWrapper id={params.id} />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton number={5} />}>
          <RelatedProducts id={params.id} />
        </Suspense>
      </div>
    </section>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="grid-cols-12 gap-8 lg:grid lg:items-start">
      <div className="col-span-7">
        <Skeleton className="h-96 w-full" />
      </div>
      <div className="col-span-5">
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
};

const ProductWrapper = async ({ id }: { id: string }) => {
  const { product } = await getSingleProduct(id);

  return (
    <Fragment>
      <div className="grid-cols-12 gap-8 lg:grid lg:items-start">
        <ImageShow product={product} />
        <ProductInfo product={product} />
      </div>
      <ProductData product={product} />
    </Fragment>
  );
};
