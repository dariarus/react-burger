import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export interface IWebSocketActions {
  wsInit: ActionCreatorWithoutPayload<string>
  wsSendMessage: ActionCreatorWithPayload<string, string>
  onOpen: ActionCreatorWithoutPayload<string>
  onClose: ActionCreatorWithoutPayload<string>
  onError: ActionCreatorWithPayload<string, string> | ActionCreatorWithoutPayload<string>
  onMessage: ActionCreatorWithPayload<any, string>
}


