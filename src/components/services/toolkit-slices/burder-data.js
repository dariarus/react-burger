import {createSlice} from '@reduxjs/toolkit';

export const burgerDataSlice = createSlice({
  name: 'burgerData', // префикс всех экшнов
  initialState: {
    isLoading: false,
    hasError: false,
    error: '',
    burgerData: []
  },
  reducers: {
    getBurgerData_success: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        burgerData: action.payload // приходит параметр
      }
    },
    getBurgerData: (state, ) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getBurgerData_failed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    }
  }
})
export const { getBurgerData_success, getBurgerData, getBurgerData_failed } = burgerDataSlice.actions
export default burgerDataSlice.reducer
