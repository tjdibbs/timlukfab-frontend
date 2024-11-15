'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { v4 as uuidV4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryController } from '@/types/categories';
import RecentlyViewed from '../ui/recently-viewed';
import { CategoryLinks } from './ui';
import { MobileSidebarSkeleton } from '../ui/sidebarskeleton';
import RangeSlider from '../ui/range-slider';

const getCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();
  return data as CategoryController.Get;
};

const SidebarMobile = () => {
  const [categories, setCategories] = useState<
    CategoryController.Category[] | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { result } = await getCategories();
      setCategories(result.categories);
    })();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const closeNav = useCallback(() => setIsOpen(false), []);

  return (
    <Fragment>
      <button
        className='flex items-center gap-2 text-normal_grey hover:text-dark_grey md:hidden'
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontalIcon width={14} />
        <p className='text-sm'>Filter</p>
      </button>
      {isOpen &&
        (categories ? (
          <Menu closeNav={closeNav} categories={categories} />
        ) : (
          <MobileSidebarSkeleton closeNav={closeNav} />
        ))}
    </Fragment>
  );
};

const Menu = memo(
  ({
    closeNav,
    categories,
  }: {
    closeNav: () => void;
    categories: CategoryController.Category[];
  }) => {
    return (
      <motion.div
        key={uuidV4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed left-0 top-0 z-[999999] block h-screen w-full bg-black/80 md:hidden'
      >
        <button
          className='absolute right-0 top-0 z-[9999999] flex h-10 w-10 items-center justify-center rounded-full'
          onClick={closeNav}
        >
          <X className='w-8 text-white' />
        </button>
        <AnimatePresence>
          <motion.div
            key={uuidV4()}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className='h-full w-[70%] max-w-[300px] overflow-y-auto bg-white px-2'
          >
            <div className='mt-6'>
              <h2 className='mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base'>
                browse
              </h2>
              <CategoryLinks categories={categories} />
            </div>
            <div className='mt-8'>
              <h2 className='mb-4 text-lg font-semibold uppercase text-normal_grey max-md:text-base'>
                Filter by price
              </h2>

              <RangeSlider closeFn={closeNav} />
            </div>
            <RecentlyViewed />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
);

Menu.displayName = 'Menu';
export default SidebarMobile;
