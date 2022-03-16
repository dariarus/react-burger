import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserDataSliceState} from "../types";
import {TToken, TUserRefresh} from "../types/data";

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    isUserLoading: false,
    success: null,
    user: {
      email: "",
      name: ""
    },
    accessToken: "",
    refreshToken: ""
  } as IUserDataSliceState,
  reducers: {
    getUserData: (state) => {
      return {
        ...state,
        isUserLoading: true
      }
  },
    setUserData: (state, action: PayloadAction<IUserDataSliceState>) => { // res.user
      return {
        ...state,
        isUserLoading: false,
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
        isUserLoading: false,
        success: action.payload.success,
        user: {
          ...state.user,
          name: action.payload.user.name,
          email: action.payload.user.email
        }
      }
    },
    deleteUserData: (state) => {
      return {
        ...state,
        user: {
          email: "",
          name: ""
        },
        accessToken: "",
        refreshToken: ""
      }
    }
  }
})
export const {getUserData, setUserData, setTokens, refreshUserData, deleteUserData} = userDataSlice.actions
export default userDataSlice.reducer
