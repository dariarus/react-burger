import {rootReducer} from "../toolkit-slices/index";

import {TErrorState, TIngredient} from "./data";

export type RootState = ReturnType<typeof rootReducer>;

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
    modalOrderDetailsOpened?: string
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
