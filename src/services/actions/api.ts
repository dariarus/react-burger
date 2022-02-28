import {getCookie, queryBurgerDataUrl, setCookie} from "../../utils/burger-data";
import {burgerDataSlice} from "../toolkit-slices/burger-data";
import {orderSlice} from "../toolkit-slices/order";
import {burgerConstructorSlice} from "../toolkit-slices/burger-constructor";
import {ingredientCounterSlice} from "../toolkit-slices/ingredient-counter";
import {TIngredient, TIngredientItem, TToken, TUserRefresh} from "../types/data";
import {AppDispatch, IOrderSliceState, IUserDataSliceState, RootState} from "../types";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";
import {userDataSlice} from "../toolkit-slices/user-data";
import App from "../../components/app/app";

const actionsBurgerData = burgerDataSlice.actions;
const actionsOrder = orderSlice.actions;
const actionsConstructor = burgerConstructorSlice.actions;
const actionsIngredientCounter = ingredientCounterSlice.actions;
const actionsUserData = userDataSlice.actions;

function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // return Promise.reject(res.json());
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}

/*** burger-data functions ***/
export const getBurgerDataFromServer = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch(actionsBurgerData.getBurgerData());

    fetch(`${queryBurgerDataUrl}/ingredients`)
      .then(res => getResponseData<{ data: ReadonlyArray<TIngredient> }>(res))
      .then(res => {
        dispatch(actionsBurgerData.getBurgerDataSuccess(res.data)) // res.data - это payload в action внутри экшна getBurgerData_success
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
                        }): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
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

/*** routing functions ***/
export const register = (name: string, email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    fetch(`${queryBurgerDataUrl}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
      .then(res => getResponseData<IUserDataSliceState>(res))
      .then(data => {
        setCookie('accessToken', data.accessToken, {expires: 20})
        setCookie('refreshToken', data.refreshToken)
        if (data.success) {
          dispatch(actionsUserData.setUserData(data));
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionsBurgerData.getBurgerDataFailed({message: error.message}))
      });
  }
}

export const authorise = (email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    return fetch(`${queryBurgerDataUrl}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then(res => getResponseData<IUserDataSliceState>(res))
      .then(data => {
        setCookie('accessToken', data.accessToken, {expires: 20})
        setCookie('refreshToken', data.refreshToken)
        if (data.success) {
          dispatch(actionsUserData.setUserData(data));
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionsBurgerData.getBurgerDataFailed({message: error.message}))
      });
  }
}

export const getUser = (accessToken: string | undefined): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    return fetch(`${queryBurgerDataUrl}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken ? accessToken : ''// иначе accessToken не подходит по типу, т.к. м/б undefined
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(res => getResponseData<TUserRefresh>(res))
      .then(data => {
        console.log(document.cookie)
        if (data.success) {
          dispatch(actionsUserData.refreshUserData(data))

        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const refreshAccessToken = (refreshToken: string | undefined): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    return fetch(`${queryBurgerDataUrl}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "token": refreshToken
      })
    })
      .then(res => getResponseData<TToken>(res))
      .then(data => {
        setCookie('accessToken', data.accessToken, {expires: 20})
        setCookie('refreshToken', data.refreshToken)
        if (data.success) {
          dispatch(actionsUserData.setTokens(data));
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

export const requestToResetPassword = (email: string, redirectToChangePWPage: () => void) => {
  fetch(`${queryBurgerDataUrl}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "email": email
    })
  })
    .then(res => getResponseData<{ success: boolean, message: string }>(res))
    .then((res) => {
      if (res.success) {
        redirectToChangePWPage();
      }
    })
    .catch(err => console.log(err))
}

export const changePassword = (password: string, token: string) => {
  fetch(`${queryBurgerDataUrl}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
    .then(res => getResponseData<{ success: boolean, message: string }>(res))
    .catch(err => console.log(err))
}

export const logout = () => {
  fetch(`${queryBurgerDataUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    })
  })
    .then(res => getResponseData<{ success: boolean, message: string }>(res))
    .catch(err => console.log(err))
}
