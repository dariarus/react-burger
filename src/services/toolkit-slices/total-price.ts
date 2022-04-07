import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ITotalPriceSliceState} from "../types/index";

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: {
    totalSendingOrderPrice: null,
    totalFeedOrderPrice: null
  } as ITotalPriceSliceState,
  reducers: {
    setTotalSendingOrderPrice: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        totalSendingOrderPrice: action.payload // calculateTotalPriceTotalSendingOrderPrice()
      }
    },
    setTotalFeedOrderPrice: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        totalFeedOrderPrice: action.payload
      }
    }
  }
})
export const {setTotalSendingOrderPrice, setTotalFeedOrderPrice} = totalPriceSlice.actions
