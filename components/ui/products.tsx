'use client';

import { useGetWishesQuery } from '@/lib/redux/services/wishes';
import { ProductController } from '@/types/products';
import Product from '../product';
import { useAppSelector } from '@/lib/redux/store';
import { useEffect } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import ProductsSkeleton from './product-skeleton';

type Props = {
  className: string;
  products: ProductController.Product[];
};

const ProductsComponent = ({ className, products }: Props) => {
  const token = useAppSelector(state => state.auth.token);
  const { data, refetch } = useGetWishesQuery(undefined, { skip: !token });

  const isClient = useIsClient();

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  if (!isClient) {
    return <ProductsSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className='h-screen max-h-96'>
        <p className='text-gray-600 max-lg:text-center'>
          No products returned for your query
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {products.map(product => (
        <Product key={product.id} product={product} wishes={data?.result} />
      ))}
    </div>
  );
};
export default ProductsComponent;
