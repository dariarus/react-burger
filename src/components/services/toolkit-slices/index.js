import {combineReducers} from "redux";

import {burgerDataSlice} from "./burder-data";
import {burgerConstructorSlice} from "./burger-constructor";
import {handleModalSlice} from "./modal";
import {orderSlice} from "./order-number";
import {totalPriceSlice} from "./total-price";

export const rootReducer = combineReducers({
  burgerDataState: burgerDataSlice.reducer,
  burgerConstructorIngredients: burgerConstructorSlice.reducer,
  modalState: handleModalSlice.reducer,
  orderState: orderSlice.reducer,
  totalPrice: totalPriceSlice.reducer
});
