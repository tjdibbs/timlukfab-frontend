'use client';

import { useGetAddressesQuery } from '@/lib/redux/services/address';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import stripe from '@/assets/stripe-4.svg';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { AddressController } from '@/types/addresses';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ExternalLink } from 'react-feather';
import { z } from 'zod';
import { OrderSchema } from '@/lib/schemas';
import { Control, FormState, useForm, UseFormWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCartQuery } from '@/lib/redux/services/cart';
import { calculateCartTotal } from '@/utils/functions';
import { useAppSelector } from '@/lib/redux/store';
import useMessage from '@/hooks/useMessage';
import { useAddOrderMutation } from '@/lib/redux/services/orders';
import { TailwindSpinner } from '../ui/spinner';
import { OrderController } from '@/types/orders';
import { ErrorResponse } from '@/lib/types';
import dynamic from 'next/dynamic';
import StripeForm from './stripe-form';

type FormSchema = z.infer<typeof OrderSchema>;

const CheckoutForm = () => {
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [cartTotal, setCartTotal] = useState<number | null>(null);
  const id = useAppSelector(state => state.auth.id);
  const { data } = useGetAddressesQuery({});
  const { data: cart, isLoading: cartLoading } = useGetCartQuery({});

  const [createOrder, { isLoading: isCreating }] = useAddOrderMutation();

  useEffect(() => {
    if (!cartLoading && cart && cart.cartItems.length > 0) {
      const total = calculateCartTotal(cart.cartItems);
      setCartTotal(total);
    }
  }, [cart]);

  const addresses = useMemo(() => data || [], [data]);

  const { alertMessage } = useMessage();

  const defaultAddress = useMemo(() => {
    return addresses?.find(address => address.isDefault);
  }, [addresses]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      billingAddressId: 0,
      orderNote: '',
      shippingAddressId: 0,
      useDefaultShippingAddress: true,
      useShippingAsBillingAddress: true,
    },
  });

  const errorExists = useMemo(() => {
    return Object.keys(form.formState.errors).length > 0;
  }, [form.formState.errors]);

  const onSubmit = async (values: FormSchema) => {
    if (!defaultAddress) {
      return alertMessage('You need to add addresses', 'error');
    }

    const {
      billingAddressId,
      orderNote,
      shippingAddressId,
      useDefaultShippingAddress,
      useShippingAsBillingAddress,
    } = values;

    if (!useDefaultShippingAddress && !shippingAddressId) {
      return alertMessage('Shipping address is not set', 'error');
    }

    if (!useShippingAsBillingAddress && !billingAddressId) {
      return alertMessage('Billing address is not set', 'error');
    }

    const determineBillingAddress = () => {
      if (useShippingAsBillingAddress) {
        if (shippingAddressId !== 0) {
          return shippingAddressId;
        }
        return defaultAddress.id;
      }
      return billingAddressId;
    };

    const determineShippingAddress = () => {
      if (useDefaultShippingAddress) {
        return defaultAddress.id;
      }
      return shippingAddressId;
    };

    const order: OrderController.Create = {
      billingAddressId: determineBillingAddress() || defaultAddress.id,
      discountAmount: 0,
      excludeItems: [],
      paymentMethod: 'stripe',
      paymentRef: `STRIPE-${Date.now()}`,
      shippingAddressId: determineShippingAddress() || defaultAddress.id,
      shippingFee: 0,
      orderNote,
    };

    try {
      const response = await createOrder(order).unwrap();
      setOrderId(response.order.id);
      setShow(true);
    } catch (error) {
      if (error instanceof Error) {
        alertMessage(error.message, 'error');
      } else {
        const message = (error as ErrorResponse).data.message;
        alertMessage(message || 'An error occurred', 'error');
      }
    }
  };

  return (
    <>
      {show && !!cartTotal && !!orderId && (
        <StripeForm show={show} cartTotal={cartTotal} orderId={orderId} />
      )}
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <ShippingAddress
            addresses={addresses}
            control={form.control}
            watch={form.watch}
            formState={form.formState}
          />
          <Separator />
          <ShippingFee />
          <Separator />
          <BillingAddress
            addresses={addresses}
            control={form.control}
            watch={form.watch}
            formState={form.formState}
          />
          <Separator />
          <PaymentMethod />
          <Separator />
          <OrderNotes control={form.control} />
          <Button
            disabled={isCreating || show}
            className='w-full'
            type='submit'
          >
            {isCreating ? <TailwindSpinner className='h-4 w-4' /> : 'PAY NOW'}
          </Button>
          {errorExists && (
            <p className='text-sm text-red-500'>Check errors and try again</p>
          )}
        </form>
      </Form>
    </>
  );
};

const ShippingAddress = memo(
  ({
    addresses,
    control,
    watch,
    formState: { errors },
  }: {
    addresses: AddressController.Address[];
    control: Control<FormSchema>;
    watch: UseFormWatch<FormSchema>;
    formState: FormState<FormSchema>;
  }) => {
    const useDefaultAddress = watch('useDefaultShippingAddress');

    return (
      <div className='space-y-4'>
        <h5 className='text-base font-semibold uppercase'>Shipping Address</h5>
        <FormField
          control={control}
          name='useDefaultShippingAddress'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-0'>
                <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Use default shipping address
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {!useDefaultAddress && (
          <Fragment>
            {addresses.length > 1 && (
              <FormField
                control={control}
                name='shippingAddressId'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={value => field.onChange(Number(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Address' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {addresses.map(address => (
                          <SelectItem
                            key={address.id}
                            value={address.id.toString()}
                          >
                            {address.streetAddress}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
            <Link
              href='/account/addresses'
              className='mt-2 inline-flex items-center gap-1 text-sm text-link-color'
            >
              Manage addresses <ExternalLink className='w-4' />
            </Link>
          </Fragment>
        )}
        {addresses.length === 0 && useDefaultAddress && (
          <Link
            href='/account/addresses'
            className='mt-2 inline-flex items-center gap-1 text-sm text-link-color'
          >
            Manage addresses <ExternalLink className='w-4' />
          </Link>
        )}
        {!useDefaultAddress && errors.shippingAddressId && (
          <p className='text-sm text-red-500'>
            {errors.shippingAddressId.message}
          </p>
        )}
      </div>
    );
  }
);

const ShippingFee = () => {
  return (
    <div className='space-y-4'>
      <h5 className='text-base font-semibold uppercase'>Shipping Fee</h5>
      <div className='flex items-center justify-between rounded border border-gray-500 p-4'>
        <span>International Standard</span>
        <span>FREE</span>
      </div>
    </div>
  );
};

const BillingAddress = memo(
  ({
    addresses,
    control,
    watch,
    formState: { errors },
  }: {
    addresses: AddressController.Address[];
    control: Control<FormSchema>;
    watch: UseFormWatch<FormSchema>;
    formState: FormState<FormSchema>;
  }) => {
    const useShippingAsBilling = watch('useShippingAsBillingAddress');

    return (
      <div className='space-y-4'>
        <h5 className='text-base font-semibold uppercase'>Billing Address</h5>
        <FormField
          control={control}
          name='useShippingAsBillingAddress'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-0'>
                <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Use shipping address
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {!useShippingAsBilling && (
          <Fragment>
            {addresses.length > 1 && (
              <FormField
                control={control}
                name='billingAddressId'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={value => field.onChange(Number(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Address' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {addresses.map(address => (
                          <SelectItem
                            key={address.id}
                            value={address.id.toString()}
                          >
                            {address.streetAddress}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
            <Link
              href='/account/addresses'
              className='mt-2 inline-flex items-center gap-1 text-sm text-link-color'
            >
              Manage addresses <ExternalLink className='w-4' />
            </Link>
          </Fragment>
        )}
        {addresses.length === 0 && useShippingAsBilling && (
          <Link
            href='/account/addresses'
            className='mt-2 inline-flex items-center gap-1 text-sm text-link-color'
          >
            Manage addresses <ExternalLink className='w-4' />
          </Link>
        )}
        {!useShippingAsBilling && errors.billingAddressId && (
          <p className='text-sm text-red-500'>
            {errors.billingAddressId.message}
          </p>
        )}
      </div>
    );
  }
);

const PaymentMethod = () => {
  return (
    <div className='space-y-4'>
      <h5 className='text-base font-semibold uppercase'>Payment Method</h5>
      <div className='flex items-center space-x-2 rounded-md border p-4 shadow'>
        <Image
          src={stripe}
          alt='stripe'
          height={100}
          width={100}
          className='w-14 object-contain'
        />
      </div>
    </div>
  );
};

const OrderNotes = memo(({ control }: { control: Control<FormSchema> }) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name='orderNote'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Order notes (optional)</FormLabel>
            <FormControl>
              <Textarea
                rows={5}
                className='resize-none'
                placeholder='Write a short note for timlukfab'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
});

OrderNotes.displayName = 'OrderNotes';
ShippingAddress.displayName = 'ShippingAddress';
BillingAddress.displayName = 'BillingAddress';
export default dynamic(async () => CheckoutForm, { ssr: false });
