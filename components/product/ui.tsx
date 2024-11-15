'use client';

import { MotionButton, MotionDiv } from '@/lib/motion';
import { ProductController } from '@/types/products';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, memo, useEffect, useMemo, useRef } from 'react';
import { Button } from '../ui/button';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { formatNumberWithCommas } from '@/utils/functions';
import { useAppSelector } from '@/lib/redux/store';
import { useIsClient } from '@/hooks/useIsClient';
import { Skeleton } from '../ui/skeleton';
import { useAddToCartMutation } from '@/lib/redux/services/cart';
import { TailwindSpinner } from '../ui/spinner';
import useMessage from '@/hooks/useMessage';
import {
  useAddToWishesMutation,
  useRemoveFromWishesMutation,
} from '@/lib/redux/services/wishes';
import { WishesController } from '@/types/wishes';

export const CartActionButton = memo(() => {
  return <MotionDiv></MotionDiv>;
});

export const CartAction = memo(
  ({
    product,
    closeFn,
  }: {
    product: ProductController.Product;
    closeFn: () => void;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [addToCart, { isLoading }] = useAddToCartMutation();

    const { alertMessage } = useMessage();

    const handleAddToCart = async (sizeId: number) => {
      try {
        await addToCart({
          productId: product.id,
          quantity: 1,
          productSizeId: sizeId,
          productColorId: product.colors[0].id,
        }).unwrap();
        alertMessage('Product added to cart', 'success');
      } catch (error) {
        alertMessage('Something went wrong', 'error');
        console.log(error);
      } finally {
        closeFn();
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          closeFn();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div
        className='absolute bottom-[5%] left-0 w-full max-md:hidden'
        ref={ref}
      >
        <div className='mx-auto w-[90%] rounded-lg border border-[#d9d9d9] bg-white p-3'>
          <div className='mb-1 flex items-center justify-between text-black'>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>Select size</span>
              {isLoading && <TailwindSpinner className='h-4 w-4' />}
            </div>
            <Button variant='ghost' size='sm' onClick={closeFn}>
              <X width={16} />
            </Button>
          </div>
          <div className='grid grid-cols-4 gap-2 max-md:grid-cols-3'>
            {product.sizes.map(size => (
              <Button
                variant={'outline'}
                size='sm'
                key={size.id}
                disabled={isLoading}
                onClick={() => handleAddToCart(size.id)}
                className={
                  'text-xs font-semibold text-black ' +
                  (isLoading ? 'cursor-not-allowed opacity-65' : '')
                }
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export const ProductImage = memo(
  ({
    product,
    showCartActionButton,
    showCartAction,
    displayCartAction,
    hideCartButton,
    hideCartAction,
    displayMobileCartAction,
  }: {
    product: ProductController.Product;
    showCartActionButton: boolean;
    showCartAction: boolean;
    hideCartButton: () => void;
    displayCartAction: () => void;
    hideCartAction: () => void;
    displayMobileCartAction: () => void;
  }) => {
    const productHasSizes = useMemo(() => product.sizes.length > 0, [product]);

    const isClient = useIsClient();

    const action = () => {
      displayCartAction();
    };

    const mobileAction = () => {
      if (productHasSizes) {
        displayMobileCartAction();
      }
    };

    if (!isClient) {
      return (
        <div>
          <Skeleton className='aspect-[4/6] w-full' />
        </div>
      );
    }

    return (
      <div className='relative hover:shadow-md'>
        <Link href={`/products/${product.id}`} className='block'>
          <Image
            src={product.medias[0].path}
            alt='product image'
            width={260}
            height={260}
            priority
            className='aspect-[4/6] w-full object-cover'
          />
        </Link>
        <AnimatePresence>
          {showCartActionButton && (
            <MotionDiv
              className='absolute bottom-[5%] left-0 flex w-full items-center justify-center max-md:hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <MotionButton
                className='w-[70%] rounded-full bg-black text-xs font-semibold'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action}
              >
                Quick Add
              </MotionButton>
            </MotionDiv>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCartAction && (
            <CartAction product={product} closeFn={hideCartAction} />
          )}
        </AnimatePresence>
        <MotionDiv
          className='absolute bottom-0 left-0 flex w-full items-center justify-end p-3 md:hidden'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MotionButton
            className='flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#f0f0f0]'
            onClick={mobileAction}
            size={'icon'}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart width={16} color='#000' />
          </MotionButton>
        </MotionDiv>
      </div>
    );
  }
);

export const ProductInfo = memo(
  ({
    product,
    wishes,
  }: {
    product: ProductController.Product;
    wishes?: WishesController.WishResult;
  }) => {
    const token = useAppSelector(state => state.auth.token);

    const isInWishist: boolean = useMemo(() => {
      return (
        wishes?.wishes.some(wish => wish.productId === product.id) || false
      );
    }, [wishes]);

    const [addToWishes, { isLoading }] = useAddToWishesMutation();
    const [removeFromWishes, { isLoading: isPending }] =
      useRemoveFromWishesMutation();

    const { alertMessage } = useMessage();

    const handleAddToWishes = async () => {
      try {
        await addToWishes({
          productId: product.id,
          description: product.description || 'description',
        }).unwrap();
        alertMessage('Added to wishlist', 'success');
      } catch (error) {
        console.log(error);
        alertMessage('Something went wrong', 'error');
      }
    };

    const handleDeleteWishist = async () => {
      if (!wishes) return;
      try {
        const wishToDelete = wishes.wishes.find(
          wish => wish.productId === product.id
        );
        if (!wishToDelete) {
          throw new Error('Wishlist not found');
        }
        await removeFromWishes({
          productId: product.id,
          wishesId: wishToDelete.id,
        }).unwrap();
        alertMessage('Removed from wishlist', 'success');
      } catch (error) {
        console.log(error);
        alertMessage('Something went wrong', 'error');
      }
    };

    return (
      <div className='py-2'>
        <div className='flex items-center justify-between'>
          <Link
            href={`/products/${product.id}`}
            className='line-clamp-1 text-sm font-semibold text-black transition-colors hover:text-normal_grey'
          >
            {product.name}
          </Link>
          {!!token && (
            <Button
              disabled={isLoading || isPending}
              variant={'ghost'}
              size={'sm'}
              className='self-start'
              onClick={isInWishist ? handleDeleteWishist : handleAddToWishes}
            >
              {isLoading || isPending ? (
                <TailwindSpinner className='h-4 w-4' />
              ) : (
                <Heart width={16} fill={isInWishist ? '#FF0000' : 'none'} />
              )}
            </Button>
          )}
        </div>
        <p className='text-lg font-bold max-md:text-base'>
          ${formatNumberWithCommas(Number(product.price))}
        </p>
        <p className='line-clamp-1 text-xs font-semibold text-primary'>
          Buy one, get one free
        </p>
      </div>
    );
  }
);

ProductImage.displayName = 'ProductImage';
CartAction.displayName = 'CartAction';
ProductInfo.displayName = 'Menu';
CartActionButton.displayName = 'CartActionButton';
