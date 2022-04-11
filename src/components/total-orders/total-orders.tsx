import React, {FunctionComponent} from "react";

import totalOrders from './total-orders.module.css';

export const TotalOrders: FunctionComponent<{ heading: string, count: number | string}> = (props) => {
  return (
    <div className={totalOrders.wrapper}>
      <h2 className="text text_type_main-medium">{props.heading}</h2>
      <p className={`text text_type_digits-large ${totalOrders.text}`}>{props.count}</p>
    </div>
  )
}
