import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { X } from 'react-feather';

const SidebarSkeleton = () => {
  return (
    <div className='col-span-3 space-y-8 max-md:hidden'>
      <div>
        <Skeleton className='h-8 w-full' />
      </div>
      <div>
        <Skeleton className='h-36 w-full' />
      </div>
      <div>
        <Skeleton className='h-8 w-full' />
      </div>
      <div>
        <Skeleton className='h-8 w-full' />
      </div>
      <div>
        <Skeleton className='h-24 w-full' />
      </div>
    </div>
  );
};

export const MobileSidebarSkeleton = memo(
  ({ closeNav }: { closeNav: () => void }) => {
    return (
      <div className='fixed left-0 top-0 z-[999999] block h-screen w-full bg-black/80 md:hidden'>
        <button
          className='absolute right-0 top-0 z-[9999999] flex h-10 w-10 items-center justify-center rounded-full'
          onClick={closeNav}
        >
          <X className='w-8 text-white' />
        </button>
        <div className='h-full w-[70%] max-w-[300px] overflow-y-auto bg-white px-2'>
          <div className='mt-6 space-y-6'>
            <div>
              <Skeleton className='h-8 w-full' />
            </div>
            <div>
              <Skeleton className='h-36 w-full' />
            </div>
            <div>
              <Skeleton className='h-8 w-full' />
            </div>
            <div>
              <Skeleton className='h-8 w-full' />
            </div>
            <div>
              <Skeleton className='h-24 w-full' />
            </div>
            <div>
              <Skeleton className='h-24 w-full' />
            </div>
            <div>
              <Skeleton className='h-24 w-full' />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MobileSidebarSkeleton.displayName = 'MobileSidebarSkeleton';
export default SidebarSkeleton;
