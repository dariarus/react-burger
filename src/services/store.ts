import {configureStore} from "@reduxjs/toolkit";
// import logger from "redux-logger";

import {rootReducer as reducer} from "./toolkit-slices/index";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middlware/socket";

import {wsActions} from "./toolkit-slices/orders-feed";
import {wsActionsSecured} from "./toolkit-slices/user-orders-feed";

import {queryFeedDataUrl} from "../utils/burger-data";

export const store = configureStore({
  reducer,
  middleware: [thunk,
    socketMiddleware(`${queryFeedDataUrl}/orders/all`, wsActions, false),
    socketMiddleware(`${queryFeedDataUrl}/orders`, wsActionsSecured, true),
  ],
  devTools: process.env.NODE_ENV !== 'production',
})
