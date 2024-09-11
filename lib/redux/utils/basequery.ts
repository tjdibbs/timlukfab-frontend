import { Mutex } from "async-mutex"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"
import { logout, setAccessToken } from "../features/auth";
import { logoutOutUser } from "../features/user";
import { Globals } from "@/types/globals";

interface CustomError {
    name: string;
    message: string;
    statusCode: number;
    path: string;
    method: string;
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    const isCustomError = (error: unknown): error is CustomError => {
        return typeof error === 'object' && error !== null &&
            'name' in error && 'statusCode' in error;
    }

    if (result?.error) {
        const err = result.error;
        const isAuthError = err.status === 401 ||
            (isCustomError(err.data) &&
                (err.data.statusCode === 403 &&
                    err.data.name === "FORBIDDEN" &&
                    err.data.message === "Not Authorized"));

        if (isAuthError) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
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
                } finally {
                    release()
                }
            } else {
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);
            }
        }
    }
    return result
}

export default baseQueryWithReauth;