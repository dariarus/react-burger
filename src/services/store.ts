import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

import {rootReducer as reducer} from "./toolkit-slices/index";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})
