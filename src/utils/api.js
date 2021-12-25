import {queryBurgerDataUrl} from "./burger-data.js";
import {burgerDataSlice} from "../components/services/toolkit-slices/burder-data.js";
import {orderSlice} from "../components/services/toolkit-slices/order-number";

const actionsBurgerData = burgerDataSlice.actions;
const actionsOrder = orderSlice.actions;

function getResponseData(res) {
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
    dispatch(actionsBurgerData.getBurgerData());

    fetch(`${queryBurgerDataUrl}/ingredients`)
      .then(res => getResponseData(res))
      .then(res => {
        dispatch(actionsBurgerData.getBurgerData_success(res.data)) // res.data - это payload в action внутри экшна getBurgerData_success
      })
      .catch(error => {
        dispatch(actionsBurgerData.getBurgerData_failed(error))
      })
  }
}

export function doOrder(ingredientsIdsList) {
  return function (dispatch) {
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
        dispatch(actionsOrder.pushOrder({
          orderNumber: res.order.number,
          order: ingredientsIdsList
        }))
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionsBurgerData.getBurgerData_failed(error))
      });
  }
}


