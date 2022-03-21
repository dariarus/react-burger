import React, {FunctionComponent} from "react";

import orderDetails from './order-details.module.css';

import {OrderComposition} from "../order-composition/order-composition";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const OrderDetails: FunctionComponent = () => {
  return (
    <div className={orderDetails.wrapper}>
      <p className="mb-10 text text_type_digits-default">#0374521</p>
      <h2 className="mb-3 text text_type_main-medium">Black Hole Singularity острый бургер</h2>
      <p className="mb-15 text text_type_main-default">Done</p>
      <h3 className="mb-6 text text_type_main-medium">Состав:</h3>
      <div className={orderDetails.list}>
        <OrderComposition/>
        <OrderComposition/>
        <OrderComposition/>
        <OrderComposition/>
        <OrderComposition/>
        <OrderComposition/>
        <OrderComposition/>
      </div>
      <div className={orderDetails.total}>
        <p className="text text_type_main-default text_color_inactive">Today, 16:45</p>
        <div className={orderDetails.count}>
          <p className="mr-2 text text_type_digits-default">540</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
