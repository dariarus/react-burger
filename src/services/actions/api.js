import {queryBurgerDataUrl} from "../../utils/burger-data";
import {burgerDataSlice} from "../toolkit-slices/burger-data";
import {orderSlice} from "../toolkit-slices/order";
import {burgerConstructorSlice} from "../toolkit-slices/burger-constructor";
import {ingredientCounterSlice} from "../toolkit-slices/ingredient-counter";

const actionsBurgerData = burgerDataSlice.actions;
const actionsOrder = orderSlice.actions;
const actionsConstructor = burgerConstructorSlice.actions;
const actionsIngredientCounter = ingredientCounterSlice.actions;

const getResponseData = (res) => {
  if (!res.ok) {
    // return Promise.reject(res.json());
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}

export function getBurgerDataFromServer() {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch(actionsBurgerData.getBurgerData());

    fetch(`${queryBurgerDataUrl}/ingredients`)
      .then(res => getResponseData(res))
      .then(res => {
        dispatch(actionsBurgerData.getBurgerDataSuccess(res.data)) // res.data - это payload в action внутри экшна getBurgerData_success
      })
      .catch(error => {
        dispatch(actionsBurgerData.getBurgerDataFailed(error))
      })
  }
}

export function doOrder(ingredientsIdsList, order) {
  return function (dispatch) {
    const isValidOrder = order.bun ? true : false

    dispatch(actionsOrder.checkOrder(isValidOrder));

    if (isValidOrder) {
      dispatch(actionsOrder.getOrderData());

      fetch(`${queryBurgerDataUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "ingredients": ingredientsIdsList
        })
      })
        .then(res => getResponseData(res))
        .then(res => {
          dispatch(actionsOrder.getOrderSuccess({
            orderNumber: res.order.number,
            order: ingredientsIdsList
          }))
        })
        .then(() => {
          dispatch(actionsConstructor.cleanOrder());
          dispatch(actionsIngredientCounter.counterClean());
        })
        .catch((error) => {
          console.log(error)
          dispatch(actionsBurgerData.getBurgerDataFailed(error))
        });
    }
  }
}


