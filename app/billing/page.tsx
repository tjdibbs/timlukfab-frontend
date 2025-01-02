import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.success) {
    return (
      <div className='flex flex-col items-center justify-center bg-gray-100 py-16'>
        <div className='w-[90%] max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
          <h1 className='mb-4 text-2xl font-bold text-green-600 max-md:text-xl'>
            Payment Successfull!
          </h1>
          <p className='mb-6 text-gray-700'>
            Your payment has been successfully processed.
          </p>
          <Button asChild>
            <Link href='/shop'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 py-16'>
      <div className='w-[90%] max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
        <h1 className='mb-4 text-2xl font-bold text-red-600 max-md:text-xl'>
          Payment Cancelled!
        </h1>
        <p className='mb-6 text-gray-700'>
          Your payment has been cancelled. You can continue shopping
        </p>
        <Button asChild>
          <Link href='/shop'>Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
