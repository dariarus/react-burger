import {MiddlewareAPI} from "redux";
import {AnyAction} from "@reduxjs/toolkit";

import {IWebSocketActions} from "../types/action-type";
import {getCookie} from "../../utils/burger-data";

export const socketMiddleware = (wsUrl: string, wsActions: IWebSocketActions, isTokenRequired: boolean) => {
  // return (store: MiddlewareAPI<AppDispatch, RootState>) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null
    let isConnected = false;

    return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
      const {payload} = action;
      const accessToken = isTokenRequired ? getCookie('accessToken')?.split(' ')[1] : null;

      if (!wsActions.wsInit.match(action)) {
        return next(action);
      } else if (!socket) {
        socket = accessToken
          ? new WebSocket(`${wsUrl}?token=${accessToken}`)
          : new WebSocket(`${wsUrl}`);

        isConnected = true;

        socket.onopen = () => {
          if (socket && socket.readyState === 1) {
            store.dispatch(wsActions.onOpen());
          }
        }
        socket.onerror = () => {
          store.dispatch(wsActions.onError('Error'));
        }
        socket.onmessage = (event: MessageEvent) => {
          const {data} = event; // извлечение объекта с данными из самого объекта event
          const parsedData = JSON.parse(data);
          store.dispatch(wsActions.onMessage(parsedData));
        }
        socket.onclose = (event: CloseEvent) => {
          store.dispatch(wsActions.onClose());
          if (event.code !== 1000) {
            store.dispatch(wsActions.onError);
            console.log('Socket closed with code: ', event.code);
          }
          if (isConnected) {
            setTimeout(() => {
              store.dispatch(wsActions.wsInit())
            }, 1000)
          }
        }
        if (wsActions.wsSendMessage.match(action)) {
          const message = accessToken ? {...payload, accessToken} : {...payload}
          socket.send(JSON.stringify(message))
        }
        next(action);
      }
    }
  }
}
