/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 22:30
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ApiResponse,
  TweetsWithUser,
  TweetWithComments,
  TweetWithUser,
} from '@/types';

export const tweetApi = createApi({
  reducerPath: 'tweets',
  tagTypes: ['TweetsWithUser'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tweet/' }),
  endpoints: (builder) => ({
    getAllTweets: builder.query<ApiResponse<TweetsWithUser>, void>({
      query: () => `get-all-tweets`,
      providesTags: () => ['TweetsWithUser'],
    }),
    getTweet: builder.query<ApiResponse<TweetWithComments>, string>({
      query: (id) => `get-tweet?id=${id}`,
    }),
    createTweet: builder.mutation<ApiResponse<TweetWithUser>, TweetWithUser>({
      query: (tweet) => ({
        url: 'create-tweet',
        method: 'POST',
        body: tweet,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    updateTweet: builder.mutation<ApiResponse<TweetWithUser>, TweetWithUser>({
      query: (tweet) => ({
        url: 'update-tweet',
        method: 'PATCH',
        body: tweet,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
  }),
});

export const {
  useGetAllTweetsQuery,
  useGetTweetQuery,
  useCreateTweetMutation,
  useUpdateTweetMutation,
} = tweetApi;
