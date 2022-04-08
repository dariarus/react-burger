import React, {FunctionComponent, useEffect} from "react";

import orderDetailsPage from './order-details-page.module.css';

import {OrderDetails} from "../../components/order-details/order-details";
import {TOrders} from "../../services/types/data";

import {useAppDispatch} from "../../services/types/hooks";
import {IWebSocketActions} from "../../services/types/action-type";

export const OrderDetailsPage: FunctionComponent<{orderActions: IWebSocketActions, order: ReadonlyArray<TOrders>, children?: React.ReactNode}> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(props.orderActions.wsInit());
  }, [dispatch, props.orderActions])

  return (
    <div className={orderDetailsPage.wrapper}>
      <OrderDetails array={props.order}/>
    </div>
  )
}
