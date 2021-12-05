/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 22:30
 */

import type { Comment } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ApiResponse,
  CommentWithUser,
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
      providesTags: (data) => {
        let id = 'tweetId';
        if (data && data.success) {
          if (data.data && 'id' in data.data) {
            id = data.data.id;
          }
        }
        return [{ type: 'TweetsWithUser', id }];
      },
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
    createComment: builder.mutation<ApiResponse<CommentWithUser>, Comment>({
      query: (comment) => ({
        url: 'create-comment',
        method: 'POST',
        body: comment,
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
  useCreateCommentMutation,
} = tweetApi;
