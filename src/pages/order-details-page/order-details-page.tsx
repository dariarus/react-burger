import React, {FunctionComponent} from "react";

import orderDetailsPage from './order-details-page.module.css';

import {OrderDetails} from "../../components/order-details/order-details";

export const OrderDetailsPage: FunctionComponent = () => {
  return (
    <div className={orderDetailsPage.wrapper}>
      <OrderDetails/>
    </div>
  )
}
