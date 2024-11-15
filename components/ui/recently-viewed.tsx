'use client';

import image from '@/assets/images/products/product10.jpg';
import type { ProductController } from '@/types/products';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { formatNumberWithCommas } from '@/utils/functions';
import Link from 'next/link';

const RecentlyViewed = () => {
  const [viewed, setViewed] = useState<ProductController.ProductCookie[]>([]);

  useEffect(() => {
    const cookie = Cookie.get('viewed');
    setViewed(cookie ? JSON.parse(cookie) : []);
  }, []);

  if (!viewed.length) return null;

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base'>
        Recently viewed
      </h2>
      <div className='space-y-3'>
        {viewed.map(product => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className='flex items-center gap-2 hover:opacity-75'
          >
            <div className='h-12 w-12'>
              <Image
                src={product.image}
                alt={product.title}
                width={64}
                height={64}
                className='h-full max-w-full object-cover'
              />
            </div>
            <div className='flex-1'>
              <h3 className='text-sm font-medium'>{product.title}</h3>
              <p className='text-sm text-normal_grey'>
                {' '}
                ${formatNumberWithCommas(Number(product.price))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RecentlyViewed;
