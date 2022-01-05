import {createSlice} from "@reduxjs/toolkit";

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: {
    totalPrice: 0
  },
  reducers: {
    setTotalPrice: (state, action) => {
      return {
        ...state,
        totalPrice: action.payload // calculateTotalPrice()
      }
    }
  }
})
export const {setTotalPrice} = totalPriceSlice.actions
export default totalPriceSlice.reducer
