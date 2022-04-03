import React, {FunctionComponent} from "react";

import createdNumbers from './order-statistics.module.css';

import {OrderNumbersList} from "../order-numbers-list/order-numbers-list";
import {TotalOrders} from "../total-orders/total-orders";
import {useSelector} from "../../services/types/hooks";

export const CreatedOrdersStatistics: FunctionComponent = () => {
  const {ordersFeedState} = useSelector(state => {
    return state;
  })

  const total = ordersFeedState.total.toLocaleString('ru-RU');
  const totalToday = ordersFeedState.totalToday.toLocaleString('ru-RU');

  return (
    <div>
      <div className={createdNumbers.wrapper}>
        <OrderNumbersList listName="Готовы:">
          {
            ordersFeedState.orders.map((order) => order.status === 'done' &&
              <p
                className={`mb-2 mr-2 text text_type_digits-default ${createdNumbers.textOrderDone}`}>{order.number}</p>)
          }
        </OrderNumbersList>
        <OrderNumbersList listName="В работе:">
          {
            ordersFeedState.orders.map((order) => {
              return ((order.status === 'created' || order.status === 'pending') &&
                <p className={`mb-2 mr-2 text text_type_digits-default`}>{order.number}</p>)
            })
          }
        </OrderNumbersList>
      </div>
      <TotalOrders heading="Выполнено за все время:" count={total}/>
      <TotalOrders heading="Выполнено за сегодня:" count={totalToday}/>
    </div>
  )
}
