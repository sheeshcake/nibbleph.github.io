import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
export const queryWebsites = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/` }),
    keepUnusedDataFor: 5,
    endpoints: (builder) => ({
      getWebsites: builder.query({
        query: () => `websites`
      })
    })
  });