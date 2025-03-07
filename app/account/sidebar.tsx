'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { links } from './data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/account/logoutButton';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { useEffect } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserQuery } from '@/lib/redux/services/user';
import useMessage from '@/hooks/useMessage';

const Sidebar = () => {
  const pathname = usePathname();

  const id = useAppSelector(state => state.auth.id);
  const dispatch = useAppDispatch();

  const { data, isLoading, refetch, isError } = useGetUserQuery(String(id), {
    skip: !id,
  });

  const { alertMessage } = useMessage();

  useEffect(() => {
    if (!id) {
      return;
    }

    if (isError) {
      alertMessage('We are having problems with the server', 'error');
    }

    refetch();
  }, [id, data, isError]);

  const isClient = useIsClient();

  if (!isClient || isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <div className='col-span-3 border-r border-r-[#eee] text-dark_grey max-lg:mb-8'>
      <header className='mb-4 flex items-center gap-2'>
        <Avatar className='h-16 w-16 max-md:h-14 max-md:w-14'>
          <AvatarImage src='' alt='avatar' />
          <AvatarFallback>
            {data?.firstName.charAt(0).toUpperCase()}
            {data?.lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className='text-base text-normal_grey'>{data?.fullName}</span>
      </header>
      <div>
        <ul>
          {links.map(link => {
            const isActive =
              pathname === link.path
                ? 'border-r-4 border-r-[#446084] text-black'
                : '';

            return (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className={`block border-b border-b-[#eee] py-4 font-semibold uppercase text-dark_grey hover:border-r-4 hover:border-r-[#446084] hover:text-black max-md:text-sm ${isActive}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <LogoutButton
              text='logout'
              className='block w-full py-4 text-left font-semibold uppercase text-dark_grey hover:border-r-2 hover:border-r-[#446084] hover:text-black max-md:text-sm'
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

const SidebarSkeleton = () => {
  return (
    <div className='col-span-3 space-y-4 border-r border-r-[#eee] px-2 max-lg:mb-8'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-16 w-16 rounded-full max-md:h-14 max-md:w-14' />
        <Skeleton className='h-8 flex-1' />
      </div>
      <div>
        <Skeleton className='h-16 w-full' />
      </div>
      <div>
        <Skeleton className='h-16 w-full' />
      </div>
      <div>
        <Skeleton className='h-16 w-full' />
      </div>
      <div>
        <Skeleton className='h-16 w-full' />
      </div>
      <div>
        <Skeleton className='h-16 w-full' />
      </div>
    </div>
  );
};
export default Sidebar;
