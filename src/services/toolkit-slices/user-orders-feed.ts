import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IFeedSliceState} from "../types/index";
import {IWebSocketActions} from "../types/action-type";

export const userOrdersFeedSlice = createSlice({
  name: 'userOrders',
  initialState: {
    isOrderFeedLoading: false,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,

    wsStartConnecting: false,
    wsConnected: false,
    hasError: false,
    error: null
  } as IFeedSliceState,
  reducers: {
    wsInit: (state) => {
      return {
        ...state,
        wsStartConnecting: true
      }
    },
    wsConnectionSuccess: (state) => {
      return {
        ...state,
        wsStartConnecting: false,
        wsConnected: true
      }
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        wsConnected: false,
        hasError: true,
        error: action.payload
      }
    },
    wsGetMessage: (state, action: PayloadAction<IFeedSliceState>) => {
      return {
        ...state,
        success: action.payload.success,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    },
    wsSendMessage: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    wsConnectionClosed: (state) => {
      return {
        ...state,
        wsConnected: false,
        // hasError: true,
        // error: `Socket closed with code: , ${action.payload.code}`
      }
    }
  }
})

export default userOrdersFeedSlice.reducer;

export const {
  wsInit,
  wsSendMessage,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} = userOrdersFeedSlice.actions;

// привязываем типы из интерфейса к конкретным экшнам - САМОЕ ГЛАВНОЕ В СОЗДАНИИ УНИВЕРСАЛЬНОГО СОКЕТА!!!
export const wsActionsSecured: IWebSocketActions = {
  wsInit: wsInit,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError:  wsConnectionError,
  onMessage: wsGetMessage,
}
