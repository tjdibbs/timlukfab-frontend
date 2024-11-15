'use client';

import { CategoryController } from '@/types/categories';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const CategoryLinks = ({
  categories,
}: {
  categories: CategoryController.Category[];
}) => {
  const pathname = usePathname();

  return (
    <ul>
      {categories.map(category => (
        <li key={category.id} className='border-b border-b-gray-200'>
          <Link
            href={`/categories/${category.id}`}
            className={clsx(
              'block py-3 text-xs font-semibold uppercase text-dark_grey hover:text-black',
              {
                'text-black': pathname
                  .split('/')
                  .includes(category.id.toString()),
              }
            )}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
