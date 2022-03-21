import {rootReducer} from "../toolkit-slices/index";

import {TErrorState, TIngredient} from "./data";
import {store} from "../store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

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
    modalOrderNumberDetailsOpened?: string
  },
  ingredientForModal: null | TIngredient
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
  totalPrice: number
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
