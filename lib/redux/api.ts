import { Globals } from '@/types/globals';
import { RootState } from './store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { logout, setAccessToken } from './features/auth';
import { logoutOutUser } from './features/user';
import { Mutex } from "async-mutex"

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error && (result.error.status === 401 || result.error?.status === 403)) {
        const refreshResult = await baseQuery("/auth/renew-token", api, extraOptions)
        if (refreshResult?.data) {
            const refreshData = refreshResult.data as Globals.TokenResponse
            if (refreshData.renewed) {
                api.dispatch(setAccessToken(refreshData.accessToken))

                result = await baseQuery(args, api, extraOptions)
            } else {
                api.dispatch(logout())
                api.dispatch(logoutOutUser())
            }

        } else {
            api.dispatch(logout())
            api.dispatch(logoutOutUser())
        }
    }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    keepUnusedDataFor: 120,
    tagTypes: ["Cart", "Wishlist"],
    endpoints: () => ({})
})