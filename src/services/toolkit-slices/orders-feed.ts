import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IFeedSliceState} from "../types/index";

export const ordersFeedSlice = createSlice({
  name: 'orders',
  initialState: {
    isOrderFeedLoading: false,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    hasError: false,
    error: null
  } as IFeedSliceState,
  reducers: {
    getOrdersFeed: (state) => {
      return {
        ...state,
        isOrderFeedLoading: true
      }
    },
    getOrdersFeedSuccess: (state) => {
      return {
        ...state,
        isOrderFeedLoading: false
      }
    },
    setOrdersFeed: (state, action: PayloadAction<IFeedSliceState>) => {
      return {
        ...state,
        success: action.payload.success,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    },
    getOrdersFeedFailed: (state) => {
      return {
        ...state,
        isOrderFeedLoading: false
      }
    },
  }
})
export const {getOrdersFeed, getOrdersFeedSuccess, setOrdersFeed} = ordersFeedSlice.actions
