import {TypedUseSelectorHook, useDispatch, useSelector as selectorHook} from 'react-redux';
import {AppDispatch, RootState} from './index';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppDispatch = () => useDispatch<AppDispatch>();
