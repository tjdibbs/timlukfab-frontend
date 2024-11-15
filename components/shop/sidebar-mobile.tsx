'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import RecentlyViewed from '../ui/recently-viewed';
import RangeSlider from '../ui/range-slider';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useGetCategoriesQuery } from '@/lib/redux/services/categories';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TailwindSpinner } from '../ui/spinner';

const SidebarMobile = () => {
  const { data, isLoading } = useGetCategoriesQuery(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const closeNav = useCallback(() => setIsOpen(false), []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='flex items-center gap-2 text-normal_grey hover:text-dark_grey md:hidden'
        >
          <SlidersHorizontalIcon width={14} />
          <p className='text-sm'>Filter</p>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        {!data && (
          <div className='flex h-full items-center justify-center'>
            <TailwindSpinner className='h-5 w-5' />
          </div>
        )}
        {data && (
          <section className='space-y-12'>
            <div className='space-y-6'>
              <h2 className='text-lg font-semibold uppercase text-normal_grey max-md:text-base'>
                browse
              </h2>
              {data.result.categories.map(category => (
                <SheetClose key={category.id} asChild>
                  <Link
                    href={`/categories/${category.id}`}
                    className={cn(
                      'block border-b border-b-gray-200 py-2 text-sm font-semibold uppercase text-dark_grey hover:text-black',
                      pathname.split('/').includes(category.id.toString()) &&
                        'text-black'
                    )}
                  >
                    {category.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className='space-y-6'>
              <h2 className='text-lg font-semibold uppercase text-normal_grey max-md:text-base'>
                Filter by price
              </h2>

              <RangeSlider closeFn={closeNav} />
            </div>
            <RecentlyViewed />
          </section>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default SidebarMobile;
