import React from 'react';

import orderDetailsStyle from "./order-details.module.css";

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderDetails() {
  return(
    <div className={orderDetailsStyle.wrapper}>
      <h2 className={`text text_type_digits-large ${orderDetailsStyle.digits}`}>034536</h2>
      <p className="mt-8 text text_type_main-small">идентификатор заказа</p>
      <div className={orderDetailsStyle.shadow}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
