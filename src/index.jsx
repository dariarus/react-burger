import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer as reducer} from "./components/services/toolkit-slices";
// import {combineReducers} from "@reduxjs/toolkit";
// import {burgerConstructorSlice} from "./components/services/toolkit-slices/burger-constructor";
// import {burgerDataSlice} from "./components/services/toolkit-slices/burder-data.js";
import logger from "redux-logger";

const initialState = {
  // modalsOpened: {},
  // ingredientForModal: null,
  // selectedIngredients: { //список всех ингредиентов в текущем конструкторе бургера
  //   bun: null,
  //   ingredients: []
  // },
  // currentIngredient: {}, // объект текущего просматриваемого ингредиента
  // order: {}, // объект созданного заказа.
  // orderNumber: null,
  // error: '',
  // burgerData: [] // список всех полученных ингредиентов,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  initialState,
  //  enhancers: [customEnhancer]
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
