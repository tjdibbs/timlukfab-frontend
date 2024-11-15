'use client';

import { useGetWishesQuery } from '@/lib/redux/services/wishes';
import DesktopWishlist from './desktop';
import MobileWishlist from './mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import useMessage from '@/hooks/useMessage';
import { useAppSelector } from '@/lib/redux/store';

export default function Page() {
  const token = useAppSelector(state => state.auth.token);
  const { data, isLoading, isError, refetch } = useGetWishesQuery(undefined, {
    skip: !token,
  });

  const { alertMessage } = useMessage();

  useEffect(() => {
    if (!token) {
      return;
    }
    refetch();
    if (isError) {
      alertMessage('Something went wrong', 'error');
    }
  }, [isError, token]);

  if (isLoading || !data) {
    return (
      <div>
        <h4 className='mb-8 text-xl font-semibold text-[#555]'>My Wishlist</h4>
        <div className='space-y-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index + 1}>
              <Skeleton className='h-20 w-full' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className='mb-8 text-xl font-semibold text-[#555]'>My Wishlist</h4>
      <DesktopWishlist wishlists={data?.result.wishes} />
      <MobileWishlist wishlists={data?.result.wishes} />
    </div>
  );
}
