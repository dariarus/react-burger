import {AppDispatch, AppThunk, IUserDataSliceState} from "../types";
import {deleteCookie, getCookie, queryBurgerDataUrl, setCookie} from "../../utils/burger-data";
import {getResponseData} from "./api";
import {burgerDataSlice} from "../toolkit-slices/burger-data";
import {userDataSlice} from "../toolkit-slices/user-data";

const actionsBurgerData = burgerDataSlice.actions;
const actionsUserData = userDataSlice.actions;

export const register = (name: string, email: string, password: string): AppThunk => {
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

export const authorise = (email: string, password: string): AppThunk => {
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

export const logout = (): AppThunk => {
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
