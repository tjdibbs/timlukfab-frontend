'use client';

import { Button } from '@/components/ui/button';
import { TailwindSpinner } from '@/components/ui/spinner';
import useMessage from '@/hooks/useMessage';
import { useRemoveFromWishesMutation } from '@/lib/redux/services/wishes';
import { WishesController } from '@/types/wishes';
import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  wishlists: WishesController.Wish[];
};

const MobileWishlist = ({ wishlists }: Props) => {
  return (
    <div className='px-2 md:hidden'>
      {wishlists.map(wishlist => (
        <WishlistItem key={wishlist.id} wishlist={wishlist} />
      ))}
    </div>
  );
};

const WishlistItem = ({ wishlist }: { wishlist: WishesController.Wish }) => {
  const [removeFromWishes, { isLoading }] = useRemoveFromWishesMutation();

  const { alertMessage } = useMessage();

  const handleRemove = async (wishlist: WishesController.Wish) => {
    try {
      await removeFromWishes({
        productId: wishlist.product.id,
        wishesId: wishlist.id,
      }).unwrap();
      alertMessage('Product removed from wishlist', 'success');
    } catch (error) {
      alertMessage('Something went wrong', 'error');
    }
  };

  return (
    <div
      key={wishlist.product.id}
      className='mb-6 border-b border-gray-200 pb-6'
    >
      <div className='mb-2 flex items-start'>
        <div className='mr-4 w-20'>
          <Image
            src={wishlist.product.medias[0].path}
            alt={wishlist.product.name}
            width={80}
            height={80}
            className='aspect-[5/6] w-full object-cover'
          />
        </div>
        <div className='flex-grow'>
          <h3 className='text-sm font-medium'>{wishlist.product.name}</h3>
          <div className='flex items-center justify-between'>
            <div>
              <span className='mr-2 text-sm text-gray-500'>Price:</span>

              <span className='font-semibold'>
                ${Number(wishlist.product.price).toFixed(2)}
              </span>
            </div>
            <Button
              size={'icon'}
              disabled={isLoading}
              variant='ghost'
              onClick={() => handleRemove(wishlist)}
            >
              {isLoading ? (
                <TailwindSpinner className='h-5 w-5' />
              ) : (
                <X width={20} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWishlist;
