import { Mutex } from 'async-mutex';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setAccessToken } from '../features/auth';
import { Globals } from '@/types/globals';

interface CustomError {
  name: string;
  message: string;
  statusCode: number;
  path: string;
  method: string;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const err = result.error;

    if (err.status === 403) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const token = (api.getState() as RootState).auth.refreshToken;
          const refreshResult = await baseQuery(
            {
              url: '/auth/renew-token',
              method: 'POST',
              body: { refreshToken: token },
            },
            api,
            extraOptions
          );
          if (refreshResult?.data) {
            const refreshData = refreshResult.data as Globals.TokenResponse;
            if (refreshData.renewed) {
              api.dispatch(setAccessToken(refreshData.accessToken));
              result = await baseQuery(args, api, extraOptions);
            } else {
              api.dispatch(logout());
            }
          } else {
            api.dispatch(logout());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};

export default baseQueryWithReauth;
