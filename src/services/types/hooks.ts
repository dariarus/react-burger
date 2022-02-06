import {TypedUseSelectorHook, useDispatch, useSelector as selectorHook} from 'react-redux';
import { RootState } from './index';
import {store} from "../store";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
