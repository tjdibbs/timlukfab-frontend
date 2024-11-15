import { OrderController } from '@/types/orders';
import { api } from '../api';

const ordersApi = api.injectEndpoints({
  endpoints: build => ({
    getAllOrders: build.query<OrderController.GET, undefined>({
      query: () => `/orders/user`,
      providesTags: ['Orders'],
    }),
    addOrder: build.mutation<OrderController.POST, OrderController.Create>({
      query: body => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart', 'Orders'],
    }),
    cancelOrder: build.mutation<unknown, number>({
      query: id => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status: 'cancelled' },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useCancelOrderMutation,
} = ordersApi;
