'use client';

import { Button } from '@/components/ui/button';
import { TailwindSpinner } from '@/components/ui/spinner';
import useMessage from '@/hooks/useMessage';
import { useRemoveFromWishesMutation } from '@/lib/redux/services/wishes';
import { WishesController } from '@/types/wishes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  wishlists: WishesController.Wish[];
};

const DesktopWishlist = ({ wishlists }: Props) => {
  return (
    <div className='hidden md:block'>
      <table className='w-full'>
        <thead>
          <tr className='text-left text-gray-500'>
            <th className='pb-2'>PRODUCT NAME</th>
            <th className='pb-2'>UNIT PRICE</th>
            <th className='pb-2'></th>
          </tr>
        </thead>
        <tbody>
          {wishlists.map(wishlist => (
            <WislistItem key={wishlist.id} wishlist={wishlist} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WislistItem = ({ wishlist }: { wishlist: WishesController.Wish }) => {
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
    <tr className='border-t border-gray-200'>
      <td className='flex items-center gap-4 py-4'>
        <div className='w-16'>
          <Image
            src={wishlist.product.medias[0].path}
            alt={wishlist.product.name}
            width={60}
            height={60}
            className='aspect-[5/6] w-full object-cover'
          />
        </div>
        <Link
          href={`/products/${wishlist.product.id}`}
          className='text-sm text-black'
        >
          {wishlist.product.name}
        </Link>
      </td>
      <td className='py-4'>
        <span className='font-semibold'>
          ${Number(wishlist.product.price).toFixed(2)}
        </span>
      </td>
      <td className='py-4'>
        <Button
          size={'default'}
          variant={'outline'}
          className='w-24'
          disabled={isLoading}
          onClick={() => handleRemove(wishlist)}
        >
          {isLoading ? <TailwindSpinner className='h-5 w-5' /> : 'Remove'}
        </Button>
      </td>
    </tr>
  );
};

export default DesktopWishlist;
