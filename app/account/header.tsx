'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const AccountHeader = () => {
  const pathname = usePathname();

  const currentTab = useMemo(() => {
    const path = pathname.split('/').at(-1);
    return path === 'account' ? 'dashboard' : path;
  }, [pathname]);

  return (
    <div className='bg-[#f7f7f7]'>
      <div className='wrapper py-4 max-md:text-center'>
        <h3 className='mb-1 text-xl font-semibold uppercase tracking-wide text-[#555] md:text-2xl'>
          my account
        </h3>
        <p className='text-sm uppercase text-[#777] md:text-base'>
          {currentTab}
        </p>
      </div>
    </div>
  );
};
export default AccountHeader;
