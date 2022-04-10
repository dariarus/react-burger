import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ITotalPriceSliceState} from "../types/index";
import {ITotalPriceActions} from "../types/action-type";

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

export default totalPriceSlice.reducer
export const {
  setTotalSendingOrderPrice,
  setTotalFeedOrderPrice
} = totalPriceSlice.actions

export const totalPriceActions: ITotalPriceActions = {
  setTotalSendingOrderPrice: setTotalSendingOrderPrice,
  setTotalFeedOrderPrice: setTotalFeedOrderPrice
}
