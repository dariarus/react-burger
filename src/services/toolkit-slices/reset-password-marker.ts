import {createSlice} from "@reduxjs/toolkit";

import {IForgotPasswordMarker} from "../types";

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

export const {setEmailSentMarker, deleteEmailSentMarker} = forgotPasswordMarkerSlice.actions
export default forgotPasswordMarkerSlice.reducer
