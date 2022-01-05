import {configureStore} from "@reduxjs/toolkit";
import {rootReducer as reducer} from "./toolkit-slices/index.js";
import logger from "redux-logger";

const initialState = {}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  initialState
})