import {ThunkAction} from "redux-thunk";
import {AppDispatch, IUserDataSliceState, RootState} from "../types";
import {AnyAction} from "@reduxjs/toolkit";
import {getCookie, queryBurgerDataUrl, setCookie} from "../../utils/burger-data";
import {TToken} from "../types/data";
import {getResponseData, throwOnError} from "./api";
import {userDataSlice} from "../toolkit-slices/user-data";

const actionsUserData = userDataSlice.actions;

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

export const refreshUserData = (accessToken: string | undefined,
                                name: string, email: string,
                                password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
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
        if (data.success) {
          setCookie('accessToken', data.accessToken, {path: "/"})
          setCookie('refreshToken', data.refreshToken, {path: "/"})
          dispatch(actionsUserData.setTokens(data));
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
