'use client';

import useProductInteractions from '@/hooks/useProductInteractions';
import { ProductController } from '@/types/products';
import { ProductImage, ProductInfo } from './ui';
import { Fragment, memo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import MobileCartAction from './mobile-action';
import { useIsClient } from '@/hooks/useIsClient';
import { Skeleton } from '../ui/skeleton';
import { WishesController } from '@/types/wishes';

type Props = {
  product: ProductController.Product;
  wishes?: WishesController.WishResult;
};

const Product = memo(({ product, wishes }: Props) => {
  const {
    showCartAction,
    showCartActionButton,
    openMobileCartAction,
    displayCartAction,
    showCartButton,
    hideCartButton,
    hideCartAction,
    displayMobileCartAction,
    hideMobileCartAction,
  } = useProductInteractions();

  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div>
        <Skeleton className='aspect-[4/6] w-full' />
      </div>
    );
  }

  return (
    <Fragment>
      {openMobileCartAction &&
        createPortal(
          <MobileCartAction
            isOpen={openMobileCartAction}
            product={product}
            closeFn={hideMobileCartAction}
          />,
          document.body
        )}

      <div
        className='relative cursor-pointer overflow-hidden duration-300'
        onMouseOver={showCartButton}
        onMouseLeave={hideCartButton}
      >
        <ProductImage
          product={product}
          displayMobileCartAction={displayMobileCartAction}
          showCartActionButton={showCartActionButton}
          hideCartButton={hideCartButton}
          displayCartAction={displayCartAction}
          showCartAction={showCartAction}
          hideCartAction={hideCartAction}
        />
        <ProductInfo product={product} wishes={wishes} />
      </div>
    </Fragment>
  );
});

Product.displayName = 'Product';
export default Product;
