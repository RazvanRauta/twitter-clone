/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 12:52
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

interface IModalState {
  isOpen: boolean;
}

const initialState: IModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setModalIsOpen } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
