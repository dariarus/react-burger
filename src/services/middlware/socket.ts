import {MiddlewareAPI} from "redux";
import {AnyAction} from "@reduxjs/toolkit";

import {middlewareSlice} from "../toolkit-slices/socket-middleware";
import {ordersFeedSlice} from "../toolkit-slices/orders-feed";
import {AppDispatch, RootState} from "../types";
import {getCookie} from "../../utils/burger-data";

export const socketMiddleware = (wsUrl: string) => {
  const actionsMiddleware = middlewareSlice.actions;
  const actionsOrderFeed = ordersFeedSlice.actions;

  // return (store: MiddlewareAPI<AppDispatch, RootState>) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null
    const token = getCookie('accessToken')?.split(' ')[1]

    return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
      if (!actionsMiddleware.wsInit.match(action)) {
        return next(action);
      } else if (!socket) {
        socket = new WebSocket(wsUrl);
        store.dispatch(actionsOrderFeed.getOrdersFeed());

        socket.onopen = () => {
          if (socket && socket.readyState === 1) {
            store.dispatch(actionsMiddleware.wsConnectionSuccess());
            store.dispatch(actionsOrderFeed.getOrdersFeedSuccess());
            socket.send(JSON.stringify({token}))
          }
        }
        socket.onerror = () => {
          store.dispatch(actionsMiddleware.wsConnectionError('Error'));
        }
        socket.onmessage = (event: MessageEvent) => {
          const {data} = event; // извлечение объекта с данными из самого объекта event
          const parsedData = JSON.parse(data);
          store.dispatch(actionsOrderFeed.setOrdersFeed(parsedData));
          console.log(store.getState().ordersFeedState.orders)
        }
        socket.onclose = (event: CloseEvent) => {
          store.dispatch(actionsMiddleware.wsConnectionClosed(event))
        }

        if(!socket && store.getState().middleware.wsConnected) {
          setTimeout(() => {store.dispatch(actionsMiddleware.wsInit())}, 1000)
        }
      //   if (actionsMiddleware.wsSendMessage.match(action)) {
      //   const message = token ? { ...payload, token } : { ...payload }
      //   socket.send(JSON.stringify(message))
      // }
        next(action);
      }
    }
  }
}
