import {deleteCookie, getCookie, queryBurgerDataUrl, setCookie} from "../../utils/burger-data";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";

import {burgerDataSlice} from "../toolkit-slices/burger-data";
import {orderSlice} from "../toolkit-slices/order";
import {userDataSlice} from "../toolkit-slices/user-data";
import {burgerConstructorSlice} from "../toolkit-slices/burger-constructor";
import {ingredientCounterSlice} from "../toolkit-slices/ingredient-counter";
import {forgotPasswordMarkerSlice} from "../toolkit-slices/reset-password-marker";

import {TIngredient, TIngredientItem, TToken} from "../types/data";
import {AppDispatch, IOrderSliceState, IUserDataSliceState, RootState} from "../types";

const actionsBurgerData = burgerDataSlice.actions;
const actionsOrder = orderSlice.actions;
const actionsConstructor = burgerConstructorSlice.actions;
const actionsIngredientCounter = ingredientCounterSlice.actions;
const actionsUserData = userDataSlice.actions;
const actionsForgotPasswordMarker = forgotPasswordMarkerSlice.actions;

function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // return Promise.reject(res.json());
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}

function throwOnError<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.text().then(text => {
      throw new Error(text)
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

    fetch(`${queryBurgerDataUrl}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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

/***---------- routing functions ----------***/

export const register = (name: string, email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    dispatch(actionsUserData.getUserData());

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
        if (data.success) {
          setCookie('accessToken', data.accessToken)
          setCookie('refreshToken', data.refreshToken)
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
    dispatch(actionsUserData.getUserData());

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
        if (data.success) {
          setCookie('accessToken', data.accessToken)
          setCookie('refreshToken', data.refreshToken)
          dispatch(actionsUserData.setUserData(data));
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionsBurgerData.getBurgerDataFailed({message: error.message}))
      });
  }
}
export const getUser = (accessToken: string | undefined, retryOnErrorCount?: number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {

    dispatch(actionsUserData.getUserData());

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
      .then(res => throwOnError<IUserDataSliceState>(res))
      .then(data => {
        // console.log(document.cookie)
        if (data.success) {
          dispatch(actionsUserData.refreshUserData(data))
        }
      })
      .catch((errObj) => {
        const err = JSON.parse(errObj.message);
        const accessTokenExisting = getCookie('accessToken')
        if (!accessTokenExisting || err.message === 'jwt expired') {
          Promise.resolve(
            dispatch(refreshAccessToken())
          ).then(() => {
            if (!retryOnErrorCount) { // retryOnErrorCount нужен: если токен так и не может успешно обновиться (refreshToken невалиден),
              // есть только n попыток повторно вызвать getUser ниже - чтобы вызов getUser не зациклился до бесконечности
              return
            }
            return dispatch(getUser(getCookie('accessToken'), (retryOnErrorCount - 1)))
          }).catch((err) => console.log(err))
        } else {
          console.log(err)
        }
      });
  }
}

export const refreshUserData = (accessToken: string | undefined, name: string, email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    dispatch(actionsUserData.getUserData());

    return fetch(`${queryBurgerDataUrl}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken ? accessToken : '' // иначе accessToken не подходит по типу, т.к. м/б undefined
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
        console.log(document.cookie)
        if (data.success) {
          dispatch(actionsUserData.refreshUserData(data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const refreshAccessToken = (): ThunkAction<void, RootState, unknown, AnyAction> => {
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
        "token": getCookie('refreshToken')
      })
    })
      .then(res => getResponseData<TToken>(res))
      .then(data => {
        if (data.success && !document.cookie) {
          setCookie('accessToken', data.accessToken)
          setCookie('refreshToken', data.refreshToken)
          dispatch(actionsUserData.setTokens(data));
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

export const requestToResetPassword = (email: string, redirectToChangePWPage: () => void): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {

    return fetch(`${queryBurgerDataUrl}/password-reset`, {
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
          dispatch(actionsForgotPasswordMarker.setEmailSentMarker());
        }
      })
      .then(() => {
        redirectToChangePWPage();
      })
      .catch(err => console.log(err))
  }
}

export const changePassword = (password: string, token: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    return fetch(`${queryBurgerDataUrl}/password-reset/reset`, {
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
      .then(response => {
        if (response.success) {
          dispatch(actionsForgotPasswordMarker.deleteEmailSentMarker())
        }
      })
      .catch(err => console.log(err))
  }
}

export const logout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return function (dispatch: AppDispatch) {
    return fetch(`${queryBurgerDataUrl}/auth/logout`, {
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
      .then(() => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch(actionsUserData.deleteUserData());

      })
      .catch(err => console.log(err))
  }
}
