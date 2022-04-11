import {createSlice} from "@reduxjs/toolkit";

import {IForgotPasswordMarker} from "../types";
import {IResetPasswordActions} from "../types/action-type";

export const forgotPasswordMarkerSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    emailWasSent: false
  } as IForgotPasswordMarker,
  reducers: {
    setEmailSentMarker: (state) => {
      return {
        ...state,
        emailWasSent: true
      }
    },
    deleteEmailSentMarker: (state) => {
      return {
        ...state,
        emailWasSent: false
      }
    }
  }
})

export default forgotPasswordMarkerSlice.reducer
export const {
  setEmailSentMarker,
  deleteEmailSentMarker
} = forgotPasswordMarkerSlice.actions

export const resetPasswordActions: IResetPasswordActions = {
  setEmailSentMarker: setEmailSentMarker,
  deleteEmailSentMarker: deleteEmailSentMarker
}
