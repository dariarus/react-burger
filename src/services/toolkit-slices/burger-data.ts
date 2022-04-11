import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IBurgerDataSliceState} from "../types/index";
import {TErrorState, TIngredient} from "../types/data";
import {IBurgerDataActions} from "../types/action-type";

export const burgerDataSlice = createSlice({
  name: 'burgerData', // префикс всех экшнов
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    burgerData: []
  } as IBurgerDataSliceState,
  reducers: {
    getBurgerDataSuccess: (state, action: PayloadAction<ReadonlyArray<TIngredient>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        burgerData: action.payload // приходит параметр
      }
    },
    getBurgerData: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getBurgerDataFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    }
  }
})

export default burgerDataSlice.reducer

export const {
  getBurgerDataSuccess,
  getBurgerData,
  getBurgerDataFailed
} = burgerDataSlice.actions

export const burgerDataActions: IBurgerDataActions = {
  getBurgerDataSuccess: getBurgerDataSuccess,
  getBurgerData: getBurgerData,
  getBurgerDataFailed: getBurgerDataFailed
}

