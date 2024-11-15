'use client';

import type { ProductController } from '@/types/products';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const CookieSetter = ({ product }: { product: ProductController.Product }) => {
  useEffect(() => {
    const viewed: ProductController.ProductCookie[] = JSON.parse(
      Cookies.get('viewed') || '[]'
    );
    const exists = viewed.find(v => v.id === product.id.toString());
    if (!exists) {
      if (viewed.length >= 5) {
        viewed.shift();
      }

      const cookie: ProductController.ProductCookie = {
        id: product.id.toString(),
        title: product.name,
        image: product.medias[0].path,
        price: product.price,
      };

      viewed.push(cookie);
      Cookies.set('viewed', JSON.stringify(viewed));
    }
  }, []);

  return null;
};
export default CookieSetter;
