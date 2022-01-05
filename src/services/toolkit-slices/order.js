import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'orderNumber',
  initialState: {
    order: [],
    orderNumber: null,
    isValidOrder: true,
    isLoading: false
  },
  reducers: {
    checkOrder: (state, action) => {
      if(action.payload) {
        return {
          ...state,
          isValidOrder: true
        }
      } else {
        return {
          ...state,
          isValidOrder: false
        }
      }
    },
    getOrderData: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    getOrderSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        orderNumber: action.payload.orderNumber,
        order: action.payload.order
      }
    }
  }
})
export const { getOrderSuccess, pushIngredientId } = orderSlice.actions
export default orderSlice.reducer
