import {combineReducers} from "redux";

import {burgerDataSlice} from "./burger-data";
import {burgerConstructorSlice} from "./burger-constructor";
import {handleModalSlice} from "./modal";
import {orderSlice} from "./order";
import {totalPriceSlice} from "./total-price";
import {ingredientCounterSlice} from "./ingredient-counter";
import {userDataSlice} from "./user-data";
import {forgotPasswordMarkerSlice} from "./reset-password-marker";
import {ordersFeedSlice} from "./orders-feed";
import {userOrdersFeedSlice} from "./user-orders-feed";

export const rootReducer = combineReducers({
  burgerDataState: burgerDataSlice.reducer,
  burgerConstructorIngredients: burgerConstructorSlice.reducer,
  modalState: handleModalSlice.reducer,
  orderState: orderSlice.reducer,
  totalPrice: totalPriceSlice.reducer,
  ingredientCounter: ingredientCounterSlice.reducer,
  userData: userDataSlice.reducer,
  forgotPasswordMarker: forgotPasswordMarkerSlice.reducer,
  ordersFeedState: ordersFeedSlice.reducer,
  userOrdersFeedState: userOrdersFeedSlice.reducer,
});
