import {AppDispatch, AppThunk, IOrderSliceState} from "../types";

import {getResponseData} from "./api";

import {getCookie, queryBurgerDataUrl} from "../../utils/burger-data";
import {TIngredient, TIngredientItem} from "../types/data";
import {burgerDataSlice} from "../toolkit-slices/burger-data";
import {orderSlice} from "../toolkit-slices/order";
import {burgerConstructorSlice} from "../toolkit-slices/burger-constructor";
import {ingredientCounterSlice} from "../toolkit-slices/ingredient-counter";

const actionsBurgerData = burgerDataSlice.actions;
const actionsOrder = orderSlice.actions;
const actionsConstructor = burgerConstructorSlice.actions;
const actionsIngredientCounter = ingredientCounterSlice.actions;

// export const getBurgerDataFromServer = (): AppThunk<Promise<unknown>> => {
export const getBurgerDataFromServer = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch(actionsBurgerData.getBurgerData());

    fetch(`${queryBurgerDataUrl}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<{ data: ReadonlyArray<TIngredient> }>(res))
      .then(res => {
        dispatch(actionsBurgerData.getBurgerDataSuccess(res.data)) // res.data - это payload в action внутри экшна getBurgerDataSuccess
      })
      .catch(error => {
        dispatch(actionsBurgerData.getBurgerDataFailed({message: error.message}))
      })
  }
}

export const doOrder = (ingredientsIdsList: ReadonlyArray<string>,
                        order: {
                          bun: TIngredient | null,
                          ingredients: readonly TIngredientItem[]
                        }): AppThunk => {
  return function (dispatch: AppDispatch) {
    const accessToken = getCookie('accessToken');

    const isValidOrder = order.bun ? true : false

    dispatch(actionsOrder.checkOrder(isValidOrder));

    if (isValidOrder) {
      dispatch(actionsOrder.getOrderData());

      fetch(`${queryBurgerDataUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': accessToken ? accessToken : ''// иначе accessToken не подходит по типу, т.к. м/б undefined
        },
        body: JSON.stringify({
          "ingredients": ingredientsIdsList
        })
      })
        .then(res => getResponseData<{ order: { number: number } }>(res))
        .then(res => {
          dispatch(actionsOrder.getOrderSuccess({
            orderNumber: res.order.number,
            order: ingredientsIdsList
          } as IOrderSliceState))
        })
        .then(() => {
          dispatch(actionsConstructor.cleanOrder());
          dispatch(actionsIngredientCounter.counterClean());
        })
        .catch((error) => {
          console.log(error)
          dispatch(actionsBurgerData.getBurgerDataFailed({message: error.message}))
        });
    }
  }
}
