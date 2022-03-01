import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserDataSliceState} from "../types";
import {TToken, TUserRefresh} from "../types/data";

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    success: null,
    user: {
      email: "",
      name: ""
    },
    accessToken: "",
    refreshToken: ""
  } as IUserDataSliceState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserDataSliceState>) => { // res.user
      return {
        ...state,
        success: action.payload.success,
        user: {
          ...state.user,
          name: action.payload.user.name,
          email: action.payload.user.email
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken

      }
    },
    setTokens: (state, action: PayloadAction<TToken>) => {
      return {
        ...state,
        success: action.payload.success,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    },
    refreshUserData: (state, action: PayloadAction<TUserRefresh>) => {
      return {
        ...state,
        success: action.payload.success,
        user: {
          ...state.user,
          name: action.payload.user.name,
          email: action.payload.user.email
        }
      }
    }
  }
})
export const {setUserData, setTokens, refreshUserData} = userDataSlice.actions
export default userDataSlice.reducer
