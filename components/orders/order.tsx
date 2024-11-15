'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderController } from '@/types/orders';
import { formatNumberWithCommas } from '@/utils/functions';
import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { memo } from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { useCancelOrderMutation } from '@/lib/redux/services/orders';
import { TailwindSpinner } from '../ui/spinner';
import useMessage from '@/hooks/useMessage';
import { ErrorResponse } from '@/lib/types';

const Order = memo(({ order }: { order: OrderController.Order }) => {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const { alertMessage } = useMessage();

  const handleCancel = async () => {
    try {
      const response = await cancelOrder(order.id).unwrap();
      console.log(response);
      alertMessage('Order cancelled successfully', 'success');
    } catch (error) {
      const message = (error as ErrorResponse).data.message;
      alertMessage(message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className='space-y-6 rounded border border-gray-400 p-4'>
      <header className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold'>
              Order #{new Date(order.createdAt).getTime()}
            </h3>
            <span
              className={clsx('text-sm capitalize', {
                'text-sky-500': order.status === 'pending',
                'text-red-500': order.status === 'cancelled',
                'text-green-500': order.status === 'delivered',
              })}
            >
              {order.status}
            </span>
          </div>
          <p className='text-sm text-normal_grey'>
            placed on:{' '}
            <span>{format(new Date(order.createdAt), 'dd MMM yyyy')}</span>
          </p>
        </div>
        <span className='font-extrabold'>
          ${formatNumberWithCommas(Number(order.totalAmount))}
        </span>
      </header>
      <ScrollArea className='w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <div className='h-10 w-10'>
                      <Image
                        src={item.product.medias[0].path}
                        alt={item.product.name}
                        height={100}
                        width={100}
                        className='h-full w-full rounded-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>{item.product.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatNumberWithCommas(Number(item.price))}
                </TableCell>
                <TableCell>{item.productSize.size.name}</TableCell>
                <TableCell>
                  <div
                    style={{ background: item.productColor.color.hexCode }}
                    className='h-4 w-4 rounded-full'
                  ></div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {order.status === 'pending' && (
          <div className='mt-4'>
            <Button
              disabled={isLoading}
              onClick={handleCancel}
              variant={'destructive'}
              size={'sm'}
            >
              {isLoading ? (
                <TailwindSpinner className='h-4 w-4' />
              ) : (
                'Cancel order'
              )}
            </Button>
          </div>
        )}
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
});

export const OrderSkeleton = () => {
  return (
    <div className='space-y-4 rounded-lg border p-4'>
      {/* Order header */}
      <div className='flex items-center justify-between'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-16' />
      </div>

      {/* Product list */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <div>
              <Skeleton className='h-4 w-36' />
              <Skeleton className='mt-1 h-3 w-24' />
            </div>
          </div>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-4 w-8' />
          <Skeleton className='h-4 w-8' />
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <div>
              <Skeleton className='h-4 w-36' />
              <Skeleton className='mt-1 h-3 w-24' />
            </div>
          </div>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-4 w-8' />
          <Skeleton className='h-4 w-8' />
        </div>
      </div>

      {/* Total amount */}
      <div className='flex justify-end'>
        <Skeleton className='h-4 w-16' />
      </div>
    </div>
  );
};

Order.displayName = 'Order';
export default Order;
