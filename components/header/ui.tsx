'use client';

import { navLinks } from '@/lib/constants';
import { useAppSelector } from '@/lib/redux/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, memo, ReactNode, Suspense, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { accountLinks } from '@/data';
import { useIsClient } from '@/hooks/useIsClient';
import LogoutButton from '../account/logoutButton';
import { useGetCategoriesQuery } from '@/lib/redux/services/categories';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import SearchComponent from './search';
import CartComponent from '../cart';
import HamburgerMenu from './hamburger-menu';
import { cn } from '@/lib/utils';

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  const isClient = useIsClient();

  if (!isClient) return <AppHeaderSkeleton />;

  return (
    <header className='sticky top-0 z-40 border-b-2 border-b-gray-100 bg-white'>
      {children}
    </header>
  );
};

export const NavLinks = memo(({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        'hidden items-center justify-center gap-8 lg:flex',
        className
      )}
    >
      {navLinks.map(link => {
        const isActive = pathname === link.path;
        return (
          <li key={link.id}>
            <Link
              href={link.path}
              className={`text-base font-semibold uppercase hover:text-black ${
                isActive ? 'text-black' : 'text-black/60'
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
});

export const AppHeaderSkeleton = () => (
  <div className='sticky top-0 z-[99999] border-b border-b-[#ccc] bg-white'>
    <div className='wrapper flex items-center justify-between py-4'>
      <div className='h-8 w-24 animate-pulse bg-gray-200'></div>
      <div className='flex items-center space-x-4'>
        <div className='h-6 w-16 animate-pulse bg-gray-200'></div>
        <div className='h-9 w-9 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-9 w-9 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-9 w-9 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-9 w-9 animate-pulse rounded-full bg-gray-200 md:hidden'></div>
      </div>
    </div>
    <div className='bg-[#fefefe] py-4'>
      <div className='wrapper no-scrollbar hidden items-center overflow-x-auto md:flex'>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className='mx-2 h-6 w-20 animate-pulse rounded bg-gray-200'
          ></div>
        ))}
      </div>
      <div className='wrapper no-scrollbar flex items-center overflow-x-auto md:hidden'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className='mx-2 h-6 w-20 animate-pulse rounded bg-gray-200'
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export const HeaderActions = memo(({ className }: { className?: string }) => {
  const credentials = useAppSelector(state => state.auth.token);

  return (
    <div className={cn('flex items-center justify-end', className)}>
      {credentials ? (
        <AccountDropdown />
      ) : (
        <Link
          href='/login'
          className='font-semibold uppercase text-black hover:text-black/60 max-lg:hidden'
        >
          Login
        </Link>
      )}
      <SearchComponent />
      {!!credentials && (
        <Fragment>
          <CartComponent />
        </Fragment>
      )}
      <HamburgerMenu />
    </div>
  );
});

const AccountDropdown = () => {
  return (
    <Fragment>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href='/account'
            className='font-semibold uppercase text-black hover:text-black/60 max-lg:hidden'
          >
            My Account
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {accountLinks.map(link => (
              <Link
                key={link.id}
                href={link.path}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                role='menuitem'
              >
                {link.name}
              </Link>
            ))}
            <LogoutButton
              text='Logout'
              className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            />
          </div>
        </HoverCardContent>
      </HoverCard>
    </Fragment>
  );
};

const CategorySkeleton = () => {
  return (
    <Fragment>
      <div className='wrapper no-scrollbar hidden items-center overflow-x-auto md:flex'>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className='mx-2 h-6 w-20 animate-pulse rounded bg-gray-200'
          ></div>
        ))}
      </div>
      <div className='wrapper no-scrollbar flex items-center overflow-x-auto md:hidden'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className='mx-2 h-6 w-20 animate-pulse rounded bg-gray-200'
          ></div>
        ))}
      </div>
    </Fragment>
  );
};

export const CategoriesBar = ({ className }: { className?: string }) => {
  const { data, isLoading } = useGetCategoriesQuery(undefined);

  const categories = data?.result.categories;
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className='pb-2'>
        <CategorySkeleton />
      </div>
    );
  }

  if (!categories) {
    return null;
  }

  return (
    <div
      className={cn(
        'wrapper no-scrollbar flex flex-nowrap items-center gap-2 overflow-x-auto',
        className
      )}
    >
      {categories.map(category => (
        <Popover
          key={category.id}
          open={openPopover === category.id}
          onOpenChange={(open: boolean) =>
            setOpenPopover(open ? category.id : null)
          }
        >
          <PopoverTrigger asChild>
            <Link
              href={`/categories/${category.id}`}
              onMouseEnter={() => setOpenPopover(category.id)}
              onMouseLeave={() => setOpenPopover(null)}
              className='rounded p-2 text-sm font-medium uppercase text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            >
              {category.name}
            </Link>
          </PopoverTrigger>
          <PopoverContent
            onMouseEnter={() => setOpenPopover(category.id)}
            onMouseLeave={() => setOpenPopover(null)}
          >
            <div className='grid grid-cols-2 gap-2'>
              {category.subcategories.map(subcategory => (
                <Link
                  key={subcategory.id}
                  href={`/categories/${category.id}/subcategories/${subcategory.id}`}
                  className='rounded p-2 text-sm uppercase text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default HeaderWrapper;
