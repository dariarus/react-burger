import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IFeedSliceState} from "../types/index";

export const ordersFeedSlice = createSlice({
  name: 'orders',
  initialState: {
    isOrderFeedLoading: false,
    success: false,
    orders: [],
    total: null,
    totalToday: null
  } as IFeedSliceState,
  reducers: {
    getOrdersFeed: (state) => {
      return {
        ...state,
        isOrderFeedLoading: true
      }
    },
    setOrdersFeed: (state, action: PayloadAction<IFeedSliceState>) => {
      return {
        ...state,
        isOrderFeedLoading: false,
        success: action.payload.success,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    }
  }
})
export const {getOrdersFeed, setOrdersFeed} = ordersFeedSlice.actions
