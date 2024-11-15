import CookieSetter from '@/components/products/cookie-setter';
import ImageShow from '@/components/products/image-show';
import ProductData from '@/components/products/productdata';
import ProductInfo from '@/components/products/productInfo';
import RelatedProducts from '@/components/products/relatedproducts';
import ProductsSkeleton from '@/components/ui/product-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { getProducts, getSingleProduct } from '@/lib/actions/products';
import { Fragment, Suspense } from 'react';

export const generateStaticParams = async () => {
  return [];
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className='py-4'>
      <div className='wrapper'>
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
    <div className='mb-8 grid-cols-12 gap-8 lg:grid lg:items-start'>
      <div className='col-span-7'>
        <Skeleton className='h-96 w-full' />
      </div>
      <div className='col-span-5'>
        <Skeleton className='h-96 w-full' />
      </div>
    </div>
  );
};

const ProductWrapper = async ({ id }: { id: string }) => {
  const { product } = await getSingleProduct(id);

  return (
    <Fragment>
      <CookieSetter product={product} />
      <div className='grid-cols-12 gap-8 lg:grid lg:items-start'>
        <ImageShow product={product} />
        <ProductInfo product={product} />
      </div>
      <ProductData product={product} />
    </Fragment>
  );
};
