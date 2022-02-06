import React, {FunctionComponent} from 'react';

import {useSelector} from "../../services/types/hooks";

import orderDetailsStyle from "./order-details.module.css";

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails: FunctionComponent = () => {
  const {orderState} = useSelector(state => {
    return state
  });

  if (orderState.isLoading) {
    return (
      <div className={orderDetailsStyle.wrapper}>
        <h2 className={`mb-10 text text_type_main-large ${orderDetailsStyle.digits}`}>Отправляем заказ...</h2>
      </div>
    );
  } else {
    return (
      orderState.isValidOrder && !orderState.isLoading && orderState.orderNumber
        ? <div className={orderDetailsStyle.wrapper}>
          <h2 className={`text text_type_digits-large ${orderDetailsStyle.digits}`}>{orderState.orderNumber}</h2>
          <p className="mt-8 text text_type_main-default">идентификатор заказа</p>
          <div className={orderDetailsStyle.shadow}>
            <CheckMarkIcon type="primary"/>
          </div>
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
            станции</p>
        </div>
        : <div className={orderDetailsStyle.wrapper}>
          <h2 className={`mb-10 text text_type_digits-large ${orderDetailsStyle.digits}`}>X_X</h2>
          <p className="text text_type_main-default">Бургер без булки - это даже не пицца!</p>
          <p className="mt-2 text text_type_main-default text_color_inactive">Пожалуйста, выберите какую-нибудь булку, и
            мы приготовим бургер, даже если в нем не будет ничего, кроме нее!</p>
        </div>
    )
  }
}
