import {combineReducers} from "redux";

import {burgerDataSlice} from "./burger-data";
import {burgerConstructorSlice} from "./burger-constructor";
import {handleModalSlice} from "./modal";
import {orderSlice} from "./order";
import {totalPriceSlice} from "./total-price";
import {ingredientCounterSlice} from "./ingredient-counter";

export const rootReducer = combineReducers({
  burgerDataState: burgerDataSlice.reducer,
  burgerConstructorIngredients: burgerConstructorSlice.reducer,
  modalState: handleModalSlice.reducer,
  orderState: orderSlice.reducer,
  totalPrice: totalPriceSlice.reducer,
  ingredientCounter: ingredientCounterSlice.reducer,
});
