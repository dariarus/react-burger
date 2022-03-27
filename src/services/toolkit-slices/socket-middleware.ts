import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISocketMiddleware} from "../types";

const socketMiddlewareInit = () => {
  let socket;
  return createSlice({
    name: 'socketMiddleware',
    initialState: {
      // socket: null,
      wsConnected: false,
    } as ISocketMiddleware,
    reducers: {
      wsInit: (state, action: PayloadAction<string>) => {
        socket = new WebSocket(action.payload);
        return {
          ...state
        }
      },
      wsConnectionSuccess: (state) => {
        return {
          ...state,
          wsConnected: true
        }
      },
      wsConnectionError: (state) => {
        return {
          ...state,
          wsConnected: false
        }
      },
      wsConnectionClosed: (state) => {
        return {
          ...state,
          wsConnected: false
        }
      }
    },
  })
}
export const socketMiddleware = socketMiddlewareInit();
export const {wsInit, wsConnectionSuccess, wsConnectionError, wsConnectionClosed} = socketMiddleware.actions
// export default socketMiddleware.reducer
