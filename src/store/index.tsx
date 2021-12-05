/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:48
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { tweetApi } from '@/service/tweet-api';

import modalReducer from './modal/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tweetApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
