import { AddressController } from '@/types/addresses';
import { api } from '../api';

const addressApi = api.injectEndpoints({
  endpoints: build => ({
    getAddresses: build.query({
      query: () => '/address',
      transformResponse: (response: AddressController.GET) =>
        response.addresses,
      providesTags: ['Addresses'],
    }),
    addAddress: build.mutation<
      AddressController.POST,
      AddressController.AddNew
    >({
      query: body => ({
        url: '/address',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Addresses'],
    }),
    updateAddress: build.mutation<
      AddressController.PUT,
      { address: AddressController.AddNew; addressId: string }
    >({
      query: ({ address, addressId }) => ({
        url: `/address/${addressId}`,
        method: 'PUT',
        body: address,
      }),
      invalidatesTags: ['Addresses'],
    }),
    setDefaultAddress: build.mutation<unknown, string>({
      query: id => ({
        url: `/address/${id}/set-default`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: build.mutation<AddressController.DELETE, string>({
      query: id => ({
        url: `/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
