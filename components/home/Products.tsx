'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Divider } from 'antd';
import { ProductController } from '@/types/products';
import ProductsComponent from '@/components/ui/products';

const Products = ({ products }: { products: ProductController.Product[] }) => {
  return (
    <section className='bg-gray-50 py-12'>
      <div className='wrapper'>
        <Divider>
          <span className='text-xl font-semibold md:text-2xl'>
            SHOP THE LATEST
          </span>
        </Divider>

        <ProductsComponent
          className='mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          products={products}
        />

        <div className='mt-12 flex items-center justify-center'>
          <Button className='w-40 text-sm' asChild>
            <Link href='/shop' className='text-white'>
              SEE MORE
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
