'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import {
  useClearCartMutation,
  useGetCartQuery,
} from '@/lib/redux/services/cart';
import { useAppSelector } from '@/lib/redux/store';
import { useEffect, useMemo } from 'react';
import { calculateCartTotal, formatNumberWithCommas } from '@/utils/functions';
import { Skeleton } from '../ui/skeleton';
import { CartController } from '@/types/cart';
import CartItem from './cartItem';
import useMessage from '@/hooks/useMessage';
import { TailwindSpinner } from '../ui/spinner';
import { useRouter } from 'nextjs-toploader/app';

const CartComponent = () => {
  const token = useAppSelector(state => state.auth.token);
  const { data, isLoading, refetch } = useGetCartQuery({}, { skip: !token });

  const [clearCart, { isLoading: cartIsClearing }] = useClearCartMutation();

  const total: number = useMemo(() => {
    return calculateCartTotal(data?.cartItems || []);
  }, [data?.cartItems]);

  const cartLength = useMemo(() => data?.cartItems.length || 0, [data]);

  const { alertMessage } = useMessage();
  const router = useRouter();

  const handleClearCart = async () => {
    try {
      if (!data) return;
      const res = await clearCart({ cartId: data.id }).unwrap();
      if (res) {
        alertMessage('Cart cleared', 'success');
      }
    } catch (error) {
      alertMessage('Something went wrong', 'error');
    }
  };

  const routeToCheckout = () => {
    router.push('/checkout');
  };

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className={cn('relative')}>
          <ShoppingCart className='max-md:4 w-5' />
          {cartLength > 0 && (
            <div className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              {cartLength}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn('grid w-full max-w-[500px] grid-rows-[auto_1fr_auto]')}
      >
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea>
          {isLoading && <CartSkeleton />}
          {data && <CartItems items={data.cartItems} />}
        </ScrollArea>
        <SheetFooter>
          <footer className='w-full space-y-2'>
            <p>Shipping calculated at checkout</p>
            <SheetClose asChild>
              <Button
                disabled={cartIsClearing}
                onClick={routeToCheckout}
                className='w-full bg-black text-white hover:bg-gray-800'
              >
                CHECKOUT • ${formatNumberWithCommas(total)}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={'destructive'}
                disabled={cartIsClearing}
                className='w-full'
                onClick={handleClearCart}
              >
                {cartIsClearing ? (
                  <TailwindSpinner className='h-4 w-4' />
                ) : (
                  'CLEAR CART'
                )}
              </Button>
            </SheetClose>
          </footer>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const CartItems = ({ items }: { items: CartController.CartItem[] }) => {
  if (!items.length) {
    return <p className='text-center'>Your cart is empty</p>;
  }

  return (
    <div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const CartSkeleton = () => {
  return (
    <div className='space-y-4 px-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div>
          <Skeleton className='h-32 w-full' />
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
