import { Skeleton } from './skeleton';

type Props = {
  number?: number;
};

const ProductsSkeleton = ({ number = 12 }: Props) => {
  return (
    <div className='col-span-9 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5'>
      {[...Array(number)].map((_, index) => (
        <div className='aspect-[4/6]' key={index + 1}>
          <Skeleton className='h-full w-full' />
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
