import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.timlukfab.com' }),
    keepUnusedDataFor: 120,
    endpoints: () => ({})
})