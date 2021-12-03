/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 22:30
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, TweetsWithUser, TweetWithUser } from '@/types';

export const tweetApi = createApi({
  reducerPath: 'tweets',
  tagTypes: ['TweetsWithUser'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tweet/' }),
  endpoints: (builder) => ({
    getAllTweets: builder.query<ApiResponse<TweetsWithUser>, void>({
      query: () => `get-all-tweets`,
      providesTags: () => ['TweetsWithUser'],
    }),
    createTweet: builder.mutation<TweetWithUser, TweetWithUser>({
      query: (tweet) => ({
        url: 'create-tweet',
        method: 'POST',
        body: tweet,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
  }),
});

export const { useGetAllTweetsQuery, useCreateTweetMutation } = tweetApi;
