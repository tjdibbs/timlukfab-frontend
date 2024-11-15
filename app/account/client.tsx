'use client';

import LogoutButton from '@/components/account/logoutButton';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { links } from './data';
import { useAppSelector } from '@/lib/redux/store';
import { useIsClient } from '@/hooks/useIsClient';
import { useGetUserQuery } from '@/lib/redux/services/user';
import useMessage from '@/hooks/useMessage';

export const DashboardSkeleton = () => {
  return (
    <div>
      <div>
        <Skeleton className='h-8 w-full' />
      </div>

      <div className='my-8 space-y-4'>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <Skeleton className='h-14 w-full' />
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const pageLinks = links.filter(link => link.id !== 1);
  const id = useAppSelector(state => state.auth.id);

  const { data, isLoading, refetch, isError } = useGetUserQuery(
    id?.toString() || '',
    {
      skip: !id,
    }
  );

  const { alertMessage } = useMessage();

  useEffect(() => {
    if (!id) return;

    refetch();

    if (isError) {
      alertMessage('We are having problems with the server', 'error');
    }
  }, [data, id]);

  const isClient = useIsClient();

  if (!data || !isClient || isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Fragment>
      <p className='text-[#777]'>
        Hello <span className='font-semibold'>{data.fullName}</span> (not{' '}
        <span className='font-semibold'>{data.fullName}</span> ?{' '}
        <LogoutButton className='text-black' text='Log out' />)
      </p>

      <p className='my-8'>
        From your account dashboard you can view your{' '}
        <Link className='text-black hover:text-black/70' href='/account/orders'>
          recent orders
        </Link>
        , manage your{' '}
        <Link
          className='text-black hover:text-black/70'
          href='/account/addresses'
        >
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link
          className='text-black hover:text-black/70'
          href='/account/account-details'
        >
          edit your password and account details
        </Link>
        .
      </p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {pageLinks.map(link => (
          <Link
            href={link.path}
            key={link.id}
            className='rounded border border-[#eee] py-4 text-center text-lg font-semibold capitalize text-[#555] transition-all duration-200 ease-linear hover:bg-[#333333] hover:text-white max-md:py-3 max-md:text-base'
          >
            {link.name}
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default Dashboard;
