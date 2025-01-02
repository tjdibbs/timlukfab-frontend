import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 py-16'>
      <div className='w-[90%] max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
        <h1 className='mb-4 text-2xl font-bold text-green-600 max-md:text-xl'>
          Email Verified!
        </h1>
        <p className='mb-6 text-gray-700'>
          Your email has been successfully verified. Thank you for confirming
          your account.
        </p>
        <Button asChild>
          <Link href='/account'>Go to Account</Link>
        </Button>
      </div>
    </div>
  );
}
