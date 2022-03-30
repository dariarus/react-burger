import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISocketMiddleware} from "../types";

export const middlewareSlice = createSlice({
    name: 'middlewareSlice',
    initialState: {
      wsStartConnecting: false,
      wsConnected: false,
      hasError: false,
      error: null
    } as ISocketMiddleware,
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
      wsSendMessage: (state) => {
        return {
          ...state
        }
      },
      wsConnectionClosed: (state, action: PayloadAction<CloseEvent>) => {
        return {
          ...state,
          wsConnected: false,
          hasError: true,
          error: `Socket closed with code: , ${action.payload.code}`
        }
      }
    },
  })
// export const socketMiddleware = socketMiddlewareInit();
export const { wsInit, wsConnectionSuccess, wsConnectionError, wsConnectionClosed} = middlewareSlice.actions
export default middlewareSlice.reducer
