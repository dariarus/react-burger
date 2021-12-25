import React from "react";
import {createSlice} from "@reduxjs/toolkit";
import {orderSlice} from "./order-number";

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: {
    totalPrice: 0
  },
  reducers: {
    setTotalPrice: (state, action) => {
      return {
        ...state,
        totalPrice: action.payload //calculateTotalPrice()
      }
    }
  }
})
export const {setTotalPrice} = totalPriceSlice.actions
export default totalPriceSlice.reducer

// const calculateTotalPrice = () => {
//   const ingredientArrayReducer = (acc, item) => {
//     return acc + item.price
//   }
//
//   let bunPrice = 0;
//   if (state.selectedIngredients.bun) {
//     bunPrice = state.selectedIngredients.bun.price * 2;
//   }
//
//   let ingredientPrice = state.selectedIngredients.ingredients.reduce(ingredientArrayReducer, 0);
//   return ingredientPrice + bunPrice;
// }

// /*** Reducers ***/
// const initTotalIngredientPrice = {
//   totalPrice: 0
// };
// const totalIngredientPriceReducer = (stateReducer, action) => {
//   switch (action.type) {
//     case "recalculateTotalPrice": {
//       return {
//         ...stateReducer,
//         totalPrice: calculateTotalPrice()
//       }
//     }
//     default:
//       return stateReducer;
//   }
// }
// const [statePrice, dispatchTotalPrice] = React.useReducer(totalIngredientPriceReducer, initTotalIngredientPrice, undefined);
//
// React.useEffect(() => {
//   dispatchTotalPrice({
//     type: "recalculateTotalPrice"
//   })
// }, [state.selectedIngredients])
