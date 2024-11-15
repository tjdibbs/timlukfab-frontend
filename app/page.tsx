import BestSelling from '@/components/home/BestSelling';
import BestSellingSkeleton from '@/components/ui/bestselling-skeleton';
import BrowseCategories from '@/components/home/BrowseCategories';
import Carousel from '@/components/home/Carousel';
import Products from '@/components/home/Products';
import Timlukfab from '@/components/home/Timlukfab';
import { getProducts } from '@/lib/actions/products';
import { Suspense } from 'react';
import { shuffleArray } from '@/utils/functions';
import ProductsSkeleton from '@/components/ui/product-skeleton';
import BrowseCategoriesSkeleton from '@/components/ui/browsecategories-skeleton';
import { getCategories } from '@/lib/actions/categories';

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
      <Suspense fallback={<BrowseCategoriesSkeleton />}>
        <CategoriesWrapper />
      </Suspense>
      <Timlukfab />
    </section>
  );
}

async function ProductsWrapper() {
  const {
    result: { products },
  } = await getProducts({ pageNumber: '1' });

  if (!products.length) {
    return <div className='py-8 text-center'>No products in store</div>;
  }

  return <Products products={products} />;
}

async function BestSellingProducts() {
  const {
    result: { products },
  } = await getProducts({ pageNumber: '1' });

  if (!products.length) return null;

  const shuffled = shuffleArray(products);

  return <BestSelling products={shuffled} />;
}

async function CategoriesWrapper() {
  const {
    result: { categories },
  } = await getCategories();

  if (!categories.length) {
    return <div className='py-8 text-center'>No categories in store</div>;
  }

  return <BrowseCategories categories={categories} />;
}
