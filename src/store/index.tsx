/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:48
 */

import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modal/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
