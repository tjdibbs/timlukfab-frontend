
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './utils/basequery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    keepUnusedDataFor: 120,
    tagTypes: ["Cart", "Wishes", "User", "Reviews"],
    endpoints: () => ({})
})