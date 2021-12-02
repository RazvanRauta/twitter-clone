/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 22:30
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, TweetsWithUser } from '@/types';

export const tweetApi = createApi({
  reducerPath: 'tweetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tweet/' }),
  endpoints: (builder) => ({
    getAllTweets: builder.query<ApiResponse<TweetsWithUser>, void>({
      query: () => `get-all-tweets`,
    }),
  }),
});

export const { useGetAllTweetsQuery } = tweetApi;
