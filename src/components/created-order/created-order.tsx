import React, {FunctionComponent} from "react";
import order from './created-order.module.css';

import {IngredientIcon} from "../ingredient-in-feed/ingredient-icon";

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export const CreatedOrder: FunctionComponent = () => {
  return (
    <div className={order.wrapper}>
      <div className={order.preview}>
        <p className="text text_type_digits-default">#0325</p>
        <p className="text text_type_main-default text_color_inactive">Today 16:45</p>
      </div>
      <h2 className={`mb-6 text text_type_main-medium ${order.burgerName}`}>Death Star Starship Main бургер</h2>
      <div className={order.ingredients}>
        <div className={order.ingredientsWrapper}>
          <IngredientIcon/>
          <IngredientIcon/>
          <IngredientIcon/>
        </div>
        <div className={order.price}>
          <p className="mr-2 text text_type_digits-default">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}
