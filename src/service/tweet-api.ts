/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 22:30
 */
import type { Comment, CommentLike, Like } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ApiResponse,
  CommentWithUser,
  TweetWithCommentsAndCount,
  TweetWithUser,
  TweetWithUserAndCount,
} from '@/types';

export const tweetApi = createApi({
  reducerPath: 'tweets',
  tagTypes: ['TweetsWithUser'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tweet/' }),
  endpoints: (builder) => ({
    getAllTweets: builder.query<ApiResponse<TweetWithUserAndCount[]>, void>({
      query: () => `get-all-tweets`,
      providesTags: () => ['TweetsWithUser'],
    }),
    getTweet: builder.query<ApiResponse<TweetWithCommentsAndCount>, string>({
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
    createTweet: builder.mutation<
      ApiResponse<TweetWithUser>,
      Omit<TweetWithUser, 'image' | 'userId' | 'id'>
    >({
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
    createComment: builder.mutation<
      ApiResponse<CommentWithUser>,
      Omit<Comment, 'userId' | 'id'>
    >({
      query: (comment) => ({
        url: 'create-comment',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    createLike: builder.mutation<
      ApiResponse<Like>,
      Omit<Like, 'id' | 'userId'>
    >({
      query: (like) => ({
        url: 'create-like',
        method: 'POST',
        body: like,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    createCommentLike: builder.mutation<
      ApiResponse<CommentLike>,
      Omit<CommentLike, 'id' | 'userId'>
    >({
      query: (commentLike) => ({
        url: 'create-comment-like',
        method: 'POST',
        body: commentLike,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    deleteLike: builder.mutation<ApiResponse<null>, Pick<Like, 'id'>>({
      query: (like) => ({
        url: 'delete-like',
        method: 'DELETE',
        body: like,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    deleteComment: builder.mutation<ApiResponse<null>, Pick<Comment, 'id'>>({
      query: (comment) => ({
        url: 'delete-comment',
        method: 'DELETE',
        body: comment,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    deleteCommentLike: builder.mutation<
      ApiResponse<null>,
      Pick<CommentLike, 'id'>
    >({
      query: (commentLike) => ({
        url: 'delete-comment-like',
        method: 'DELETE',
        body: commentLike,
      }),
      invalidatesTags: ['TweetsWithUser'],
    }),
    deleteTweet: builder.mutation<
      ApiResponse<null>,
      Pick<TweetWithUserAndCount, 'id'>
    >({
      query: (tweet) => ({
        url: 'delete-tweet',
        method: 'DELETE',
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
  useCreateCommentMutation,
  useCreateLikeMutation,
  useCreateCommentLikeMutation,
  useDeleteLikeMutation,
  useDeleteTweetMutation,
  useDeleteCommentLikeMutation,
  useDeleteCommentMutation,
} = tweetApi;
