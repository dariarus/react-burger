import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'orderNumber',
  initialState: {
    order: [],
    orderNumber: null,
    isLoading: false
  },
  reducers: {
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
