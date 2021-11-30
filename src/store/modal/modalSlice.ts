/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 12:52
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

interface IModalState {
  isOpen: boolean;
  postId: string | null;
}

const initialState: IModalState = {
  isOpen: false,
  postId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setModalPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
  },
});

export const { setModalIsOpen, setModalPostId } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isOpen;
export const getModalPostId = (state: RootState) => state.modal.postId;

export default modalSlice.reducer;
