'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'default', label: 'Default sorting' },
  { value: 'date', label: 'Sort by latest' },
  { value: 'price', label: 'Sort by price: low to high' },
  { value: 'price-desc', label: 'Sort by price: high to low' },
];

const SelectSorter = memo(({ searchParams }: Props) => {
  const [defaultValue, setDefaultValue] = useState('default');

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const max_price = searchParams.max_price;
    const min_price = searchParams.min_price;

    const value = event.target.value === 'default' ? '' : event.target.value;

    if (!max_price || !min_price) {
      const query = !!value ? `${pathname}?orderby=${value}` : pathname;
      router.push(query);
    } else {
      const query = `${pathname}?orderby=${value}&max_price=${max_price}&min_price=${min_price}`;
      router.push(query);
    }
  };

  const params = useSearchParams();

  return (
    <div>
      <select
        onChange={handleChange}
        defaultValue={params.get('orderby') || 'default'}
        className='w-64 cursor-pointer rounded-sm border border-x-gray-200 bg-gray-100 p-2 px-3 focus:outline-none max-md:px-2 max-md:text-sm'
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            onClick={() => setDefaultValue(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

SelectSorter.displayName = 'SelectSorter';
export default SelectSorter;
