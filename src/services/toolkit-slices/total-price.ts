import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ITotalPriceSliceState} from "../types/index";

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: {
    totalPrice: 0
  } as ITotalPriceSliceState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        totalPrice: action.payload // calculateTotalPrice()
      }
    }
  }
})
export const {setTotalPrice} = totalPriceSlice.actions
