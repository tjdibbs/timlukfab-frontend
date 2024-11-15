'use client';

import { useGetSingleProductQuery } from '@/lib/redux/services/product';
import { ProductController } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { CartController } from '@/types/cart';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { calculateCartItemAdditionalPrice } from '@/utils/functions';
import { useUpdateCartItemMutation } from '@/lib/redux/services/cart';
import { TailwindSpinner } from '../ui/spinner';
import useMessage from '@/hooks/useMessage';

type Props = {
  item: CartController.CartItem;
  closeFn: () => void;
};

const LoadingSkeleton = () => {
  return (
    <div className='mt-4 space-y-4'>
      <div>
        <Skeleton className='h-20 w-full' />
      </div>
      <div>
        <Skeleton className='h-20 w-full' />
      </div>
    </div>
  );
};

const EditCartItem = memo(({ item, closeFn }: Props) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductQuery(item.product.id.toString());

  const [updateCart, { isLoading: isPending, isError: isFalsy }] =
    useUpdateCartItemMutation();

  const [size, setSize] = useState<ProductController.Size | null | undefined>(
    product?.sizes.find(s => s.id === item.productSize.id)
  );
  const [color, setColor] = useState<
    ProductController.Color | null | undefined
  >(product?.colors.find(c => c.id === item.productColor.id));

  const handleSizeChange = (size: ProductController.Size) => {
    setSize(size);
  };

  const handleColorChange = (color: ProductController.Color) => {
    setColor(color);
  };

  const productSizes = useMemo(() => {
    return product?.sizes.filter(size => size.ProductSize.stock > 0) || [];
  }, [product]);

  const productColors = useMemo(() => {
    return product?.colors.filter(color => color.ProductColor.stock > 0) || [];
  }, [product]);

  const { alertMessage } = useMessage();

  const updateCartItem = async () => {
    if (product && size && color) {
      const payload: CartController.UpdateItem = {
        cartItemId: item.id,
        productSizeId: size.id,
        productColorId: color.id,
        quantity: item.quantity,
      };
      try {
        const res = await updateCart(payload).unwrap();
        if (!res) {
          throw new Error('Failed to update cart');
        }
        alertMessage('Item updated successfully', 'success');
        closeFn();
      } catch (error) {
        console.log(error);
        alertMessage('Something went wrong', 'error');
      }
    }
    return;
  };

  useEffect(() => {
    if (product && !size && !color) {
      setSize(product.sizes.find(s => s.id === item.productSize.id));
      setColor(product.colors.find(c => c.id === item.productColor.id));
    }
  }, [product]);

  return (
    <div className='flex items-center gap-4'>
      <div className='w-44 max-md:w-36'>
        <Image
          src={item.product.medias[0].path}
          alt={item.product.name}
          height={100}
          width={100}
          className='aspect-[4/6] w-full object-cover'
        />
      </div>
      <div className='flex flex-1 flex-col gap-6 self-start'>
        <div>
          <div className='flex items-center justify-between'>
            <Link
              href={`/products/${item.product.id}`}
              className='text-xs text-gray-700 underline'
            >
              See full details
            </Link>
            {isPending && <TailwindSpinner className='h-4 w-4' />}
          </div>
          <div>
            <p className='mb-2 text-base font-medium'>{item.product.name}</p>
          </div>

          {isLoading && <LoadingSkeleton />}
          {isError && <p className='text-red-800'>Something went wrong</p>}
          {!!product && (
            <Fragment>
              <p className='mb-4 text-red-800'>
                ${product.price} +{' '}
                <span className='text-gray-600'>
                  ${calculateCartItemAdditionalPrice(item)}
                </span>
              </p>
              <div className='mb-4'>
                {/* <p className="mb-2 text-sm">Sizes</p> */}
                <div className='grid grid-cols-4 gap-2'>
                  {productSizes.map(s => {
                    return (
                      <Button
                        key={s.id}
                        disabled={isPending}
                        onClick={() => handleSizeChange(s)}
                        variant={size?.id === s.id ? 'default' : 'outline'}
                      >
                        {s.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div>
                {/* <p className="mb-2 text-sm">Colors</p> */}
                <div className='flex items-center gap-2'>
                  {productColors.map(c => {
                    return (
                      <button
                        key={c.id}
                        disabled={isPending}
                        onClick={() => handleColorChange(c)}
                        className={clsx(
                          'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 hover:border-black',
                          {
                            'border-black': c.id === color?.id,
                          }
                        )}
                      >
                        <div
                          style={{ backgroundColor: c.hexCode }}
                          className='h-[90%] w-[90%] rounded-full'
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <div>
          <Button
            size={'sm'}
            disabled={isPending}
            onClick={updateCartItem}
            className='text-sm'
          >
            {isPending ? (
              <TailwindSpinner className='h-5 w-5' />
            ) : (
              'Update Item'
            )}
          </Button>
        </div>
        {isFalsy && <p className='text-red-800'>Something went wrong</p>}
      </div>
    </div>
  );
});

EditCartItem.displayName = 'EditCartItem';
export default EditCartItem;
