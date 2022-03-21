import React, {FunctionComponent} from "react";

import createdNumbers from './order-statistics.module.css';

import {OrderNumbersList} from "../order-numbers-list/order-numbers-list";
import {TotalOrders} from "../total-orders/total-orders";

export const CreatedOrdersStatistics: FunctionComponent = () => {
  return (
    <div>
      <div className={createdNumbers.wrapper}>
        <OrderNumbersList listName="Готовы:"/>
        <OrderNumbersList listName="В работе:"/>
      </div>
      <TotalOrders heading="Выполнено за все время:" count={123457}/>
      <TotalOrders heading="Выполнено за сегодня:" count={37}/>
    </div>
  )
}
