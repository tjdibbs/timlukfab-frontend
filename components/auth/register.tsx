'use client';

import { RegisterFormSchema } from '@/lib/schemas';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryList } from '@/lib/country';
import Link from 'next/link';
import { useState } from 'react';
import { useRegisterUserMutation } from '@/lib/redux/services/auth';
import Spinner from '@/components/ui/spinner';
import useMessage from '@/hooks/useMessage';
import { AuthCredentials, ErrorResponse } from '@/lib/types';
import { useAppDispatch } from '@/lib/redux/store';
import { setCredentials } from '@/lib/redux/features/auth';
import { useRouter } from 'nextjs-toploader/app';
import Cookies from 'js-cookie';
import { cn } from '@/lib/utils';

type FormSchema = z.infer<typeof RegisterFormSchema>;

const Register = () => {
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
    dialingCode: string;
  } | null>(null);

  const dispatch = useAppDispatch();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const router = useRouter();

  const { alertMessage } = useMessage();

  const form = useForm<FormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'male',
      contact: {
        country: '',
        text: '',
        isoCode: '',
        dialingCode: '',
      },
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
    try {
      const dataToSend = {
        ...data,
        contact: { ...data.contact },
        country: data.contact.country,
      };
      const response = await registerUser(dataToSend).unwrap();
      alertMessage(
        response.message || 'Account Created Successfully: Redirecting...',
        'success'
      );
      form.reset();
      const { token, refreshToken, user } = response;
      const credentials: AuthCredentials = {
        id: user.id,
        token,
        refreshToken,
      };

      Cookies.set('email-verification', String(user.id));
      dispatch(setCredentials(credentials));
      router.push('/verify-email');
    } catch (error) {
      const message = (error as ErrorResponse).data.message;
      alertMessage(message || 'An error occurred', 'error');
    }
  };

  return (
    <div className='wrapper'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto max-w-md space-y-4 py-12'
        >
          <h1 className='mb-2 text-center text-3xl font-semibold max-md:text-2xl'>
            Register
          </h1>
          <p className='mb-8 text-center text-gray-600'>
            Please fill in the information below:
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='First name'
                      {...field}
                      className={cn(
                        'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                      )}
                    />
                  </FormControl>
                  <FormMessage className='mt-1 text-xs text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700'>
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Last name'
                      {...field}
                      className={cn(
                        'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                      )}
                    />
                  </FormControl>
                  <FormMessage className='mt-1 text-xs text-red-500' />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Email'
                    {...field}
                    className={cn(
                      'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                    )}
                  />
                </FormControl>
                <FormMessage className='mt-1 text-xs text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Gender
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                      )}
                    >
                      <SelectValue placeholder='Select a gender' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='mt-1 text-xs text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact.country'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Country
                </FormLabel>
                <Select
                  onValueChange={value => {
                    const country = countryList.find(c => c.name === value);
                    if (country) {
                      setSelectedCountry(country);
                      form.setValue('contact.isoCode', country.code);
                      form.setValue('contact.dialingCode', country.dialingCode);
                      form.setValue('contact.country', country.name);
                    }
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                      )}
                    >
                      <SelectValue placeholder='Select a country' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryList.map(country => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='mt-1 text-xs text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact.text'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className='flex'>
                    {selectedCountry && (
                      <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'>
                        {selectedCountry.dialingCode}
                      </span>
                    )}
                    <Input
                      placeholder='Phone number'
                      {...field}
                      className='flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                      onChange={e => {
                        // Remove non-digit characters
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage className='mt-1 text-xs text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Password'
                    {...field}
                    className={cn(
                      'w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black'
                    )}
                  />
                </FormControl>
                <FormMessage className='mt-1 text-xs text-red-500' />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isLoading}
            className={cn(
              'w-full rounded-md bg-black px-4 py-2 text-white transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-95'
            )}
          >
            {isLoading ? <Spinner strokeColor='#fff' /> : 'CREATE MY ACCOUNT'}
          </Button>
          <p className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline'>
              login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Register;
