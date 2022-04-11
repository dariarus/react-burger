import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload
} from "@reduxjs/toolkit";
import {IOrderSliceState, IUserDataSliceState} from "./index";
import {
  TDraggableItem,
  TErrorState,
  TIngredient,
  TOrders,
  TToken,
  TUserRefresh
} from "./data";

export interface IWebSocketActions {
  wsInit: ActionCreatorWithoutPayload<string>
  wsSendMessage: ActionCreatorWithPayload<string, string>
  onOpen: ActionCreatorWithoutPayload<string>
  onClose: ActionCreatorWithoutPayload<string>
  onError: ActionCreatorWithPayload<string, string> | ActionCreatorWithoutPayload<string>
  onMessage: ActionCreatorWithPayload<any, string>
}

export interface IBurgerConstructorActions {
  addIngredientToOrder: ActionCreatorWithPayload<TIngredient>,
  deleteIngredientFromOrder: ActionCreatorWithPayload<string, string>,
  setIngredientToDrag: ActionCreatorWithPayload<TDraggableItem>,
  cleanOrder: ActionCreatorWithoutPayload<string>
}

export interface IBurgerDataActions {
  getBurgerDataSuccess: ActionCreatorWithPayload<ReadonlyArray<TIngredient>>,
  getBurgerData: ActionCreatorWithoutPayload<string>,
  getBurgerDataFailed: ActionCreatorWithPayload<TErrorState>
}

export interface ICounterActions {
  counterIncrement: ActionCreatorWithPayload<TIngredient>,
  counterDecrement: ActionCreatorWithPayload<string, string>,
  counterClean: ActionCreatorWithoutPayload<string>
}

export interface IModalActions {
  setIngredientForModal: ActionCreatorWithPayload<TIngredient | TOrders>,
  handleModalOpen: ActionCreatorWithPayload<{ [index: string]: boolean }>,
  handleModalClose: ActionCreatorWithoutPayload<string>
}

export interface IOrderActions {
  checkOrder: ActionCreatorWithPayload<boolean>,
  getOrderData: ActionCreatorWithoutPayload<string>,
  getOrderSuccess: ActionCreatorWithPayload<IOrderSliceState>
}

export interface IResetPasswordActions {
  setEmailSentMarker: ActionCreatorWithoutPayload<string>,
  deleteEmailSentMarker: ActionCreatorWithoutPayload<string>
}

export interface ITotalPriceActions {
  setTotalSendingOrderPrice: ActionCreatorWithPayload<number | null>,
  setTotalFeedOrderPrice: ActionCreatorWithPayload<number | null>
}

export interface IUserDataActions {
  getUserData: ActionCreatorWithoutPayload<string>,
  setUserData: ActionCreatorWithPayload<IUserDataSliceState>,
  setTokens: ActionCreatorWithPayload<TToken>,
  refreshUserData: ActionCreatorWithPayload<TUserRefresh>,
  deleteUserData: ActionCreatorWithoutPayload<string>
}

type TOrderActions =
  IOrderActions
  | IWebSocketActions
  | ITotalPriceActions

type TConstructorActions =
  IBurgerConstructorActions
  | ICounterActions
  | ITotalPriceActions
//
type TIngredientsActions =
  IBurgerDataActions

type TModalActions =
  IModalActions
//
type TUserRequestActions =
  IResetPasswordActions
  | IUserDataActions


export type TApplicationActions =
  TOrderActions
  | TConstructorActions
  | TIngredientsActions
  | TModalActions
  | TUserRequestActions;

