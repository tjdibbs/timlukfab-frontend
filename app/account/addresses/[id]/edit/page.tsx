'use client';

import { useEffect, useMemo } from 'react';
import EditForm from './form';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/store';
import { useGetAddressesQuery } from '@/lib/redux/services/address';
import { useIsClient } from '@/hooks/useIsClient';

const Page = () => {
  const { id } = useParams() as { id: string };
  const userId = useAppSelector(state => state.auth.id);

  const { data, refetch, isLoading } = useGetAddressesQuery(
    {},
    { skip: !userId }
  );

  const isClient = useIsClient();

  const address = useMemo(() => {
    return data?.find(item => item.id === Number(id));
  }, [data, id]);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  if (!isClient) {
    return (
      <div>
        <h4 className='mb-8 text-xl font-semibold text-[#555]'>Loading...</h4>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h4 className='mb-8 text-xl font-semibold text-[#555]'>Loading...</h4>
      </div>
    );
  }

  if (!address && !isLoading) {
    return (
      <div>
        <h4 className='mb-8 text-xl font-semibold text-[#555]'>
          Address Not Found
        </h4>
      </div>
    );
  }

  return (
    <div>
      <h4 className='mb-8 text-xl font-semibold uppercase text-[#555]'>
        Edit Address
      </h4>
      {!!address && <EditForm address={address} />}
    </div>
  );
};
export default Page;
