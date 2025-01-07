import { api } from '../api';

interface PaymentIntent {
  amount: number;
  currency: string;
}

const stripeApi = api.injectEndpoints({
  endpoints: build => ({
    createPaymentIntent: build.mutation<
      { clientSecret: string },
      PaymentIntent
    >({
      query: body => ({
        url: '/payments/stripe/payment-intent',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = stripeApi;
