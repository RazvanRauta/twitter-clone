/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 30 2021
 * @ Time: 12:50
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
