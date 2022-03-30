import {configureStore} from "@reduxjs/toolkit";
// import logger from "redux-logger";

import {rootReducer as reducer} from "./toolkit-slices/index";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middlware/socket";
import {queryFeedDataUrl} from "../utils/burger-data";

export const store = configureStore({
  reducer,
  middleware: [thunk, socketMiddleware(`${queryFeedDataUrl}/orders/all`)],
  devTools: process.env.NODE_ENV !== 'production',
})
