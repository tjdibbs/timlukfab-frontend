import { getCategories } from '@/lib/actions/categories';
import { Fragment } from 'react';
import { CategoryController } from '@/types/categories';
import { CategoryLinks } from './client';
import RecentlyViewed from '../ui/recently-viewed';
import RangeSlider from '../ui/range-slider';

const Sidebar = async () => {
  const {
    result: { count, categories },
  } = await getCategories();

  if (count === 0) {
    return (
      <div className='col-span-3 max-md:hidden'>
        <p>No categories</p>
      </div>
    );
  }

  return (
    <div className='col-span-3 max-md:hidden'>
      <CategoryList categories={categories} />
    </div>
  );
};

const CategoryList = ({
  categories,
}: {
  categories: CategoryController.Category[];
}) => {
  return (
    <Fragment>
      <div>
        <h2 className='mb-4 text-lg font-semibold uppercase text-normal_grey'>
          browse
        </h2>
        <CategoryLinks categories={categories} />
      </div>
      <div className='mt-8'>
        <h2 className='mb-4 text-lg font-semibold uppercase text-normal_grey'>
          Filter by price
        </h2>
        <RangeSlider />
      </div>
      <RecentlyViewed />
    </Fragment>
  );
};
export default Sidebar;
