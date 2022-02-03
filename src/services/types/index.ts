import {rootReducer} from "../toolkit-slices/index";

import {TIngredient} from "./data";

export type RootState = ReturnType<typeof rootReducer>;

/*** burger-data slice initial state ***/
export interface IBurgerDataSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: string,
  burgerData: ReadonlyArray<TIngredient>
}

/*** modal slice initial state ***/
export interface IModalSliceState {
  modalsOpened: void | object,
  ingredientForModal: null | TIngredient
}

/*** order slice initial state ***/
export interface IOrderSliceState {
  order: ReadonlyArray<void | string>,
  orderNumber: number | null,
  isValidOrder: boolean,
  isLoading: boolean
}

/*** total price slice initial state ***/
export interface ITotalPriceSliceState {
  totalPrice: number
}
