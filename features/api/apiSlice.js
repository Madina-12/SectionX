import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sherpur-sectionx.up.railway.app/' }),
    tagTypes: ['Post', 'Section'],
    endpoints: builder => ({})
})