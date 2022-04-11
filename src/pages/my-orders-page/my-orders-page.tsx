import React, {FunctionComponent, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

import userOrders from "./my-orders-page.module.css";

import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {userOrdersFeedSlice} from "../../services/toolkit-slices/user-orders-feed";

import {CreatedOrder} from "../../components/created-order/created-order";

export const MyOrdersPage: FunctionComponent = () => {
  const {userOrdersFeedState} = useSelector(state => {
    return state;
  })
  const actionsUserOrdersFeed = userOrdersFeedSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionsUserOrdersFeed.wsInit());
    return () => {
      dispatch(actionsUserOrdersFeed.wsConnectionClosed());
    }
  }, [actionsUserOrdersFeed, dispatch])

  const location = useLocation();

  return (
    <div className={userOrders.wrapper}>
      <ul className={userOrders.feed}>
        {
          userOrdersFeedState.orders.map((order, index) => (
            <li className={userOrders.feedItem} key={index}>
              <Link to={{
                pathname: `orders/${order._id}`,
                state: {background: location}
              }}
                    className={`text text_type_main-medium ${userOrders.link}`}
              >
                <CreatedOrder order={order} status={true}/>
              </Link>
            </li>
          )).reverse()
        }
      </ul>
    </div>
  )
}
