import {rootReducer} from "../toolkit-slices/index";

import {TErrorState, TIngredient, TOrders} from "./data";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";
// import {store} from "../store";

export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

/*** burger-data slice initial state ***/
export interface IBurgerDataSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  burgerData: ReadonlyArray<TIngredient>
}

/*** modal slice initial state ***/
export interface IModalSliceState {
  modalsOpened: {
    modalIngredientDetailsOpened?: string,
    modalOrderNumberDetailsOpened?: string,
    modalOrderDetailsOpened?: string
  },
  ingredientForModal: null | TIngredient | TOrders
}

/*** order slice initial state ***/
export interface IOrderSliceState {
  order: ReadonlyArray<string>,
  orderNumber: number | null,
  isValidOrder: boolean,
  isLoading: boolean
}

/*** total price slice initial state ***/
export interface ITotalPriceSliceState {
  totalSendingOrderPrice: number | null,
  totalFeedOrderPrice: number | null
}

/*** user data slice initial state ***/
export interface IUserDataSliceState {
  isUserLoading: boolean,
  success: boolean | null,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

/*** forgot password slice ***/
export interface IForgotPasswordMarker {
  emailWasSent: boolean
}

/*** feed slice ***/
export interface IFeedSliceState {
  isOrderFeedLoading?: boolean,
  success: boolean,
  orders: ReadonlyArray<TOrders>,
  total: number,
  totalToday: number,
  hasError?: boolean,
  error?: null | string
}

/*** socket middleware slice ***/
export interface ISocketMiddleware {
  wsStartConnecting: boolean,
  wsConnected: boolean,
  hasError: boolean,
  error: null | string
}
