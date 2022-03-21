import React, {FunctionComponent} from "react";

import feedWrapper from "./feed-page.module.css";

import {CreatedOrder} from "../../components/created-order/created-order";
import {CreatedOrdersStatistics} from "../../components/order-statistics/order-statistics";

export const FeedPage: FunctionComponent = () => {
  return (
    <>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={feedWrapper.section}>
        <div className={feedWrapper.feed}>
          <CreatedOrder/>
          <CreatedOrder/>
          <CreatedOrder/>
          <CreatedOrder/>
          <CreatedOrder/>
          <CreatedOrder/>
          <CreatedOrder/>
        </div>
        <CreatedOrdersStatistics/>
      </div>
    </>
  )
}
