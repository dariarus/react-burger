import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'orderNumber',
  initialState: {
    order: [],
    orderNumber: null
  },
  reducers: {
    pushOrder: (state, action) => {
      return {
        ...state,
        orderNumber: action.payload.orderNumber,
        order: action.payload.order
      }
    }
  }
})
export const {pushOrderNumber, pushIngredientId} = orderSlice.actions
export default orderSlice.reducer
