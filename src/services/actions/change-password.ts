import {ThunkAction} from "redux-thunk";
import {AppDispatch, RootState} from "../types";
import {AnyAction} from "@reduxjs/toolkit";
import {queryBurgerDataUrl} from "../../utils/burger-data";
import {getResponseData} from "./api";
import {forgotPasswordMarkerSlice} from "../toolkit-slices/reset-password-marker";

const actionsForgotPasswordMarker = forgotPasswordMarkerSlice.actions;

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
