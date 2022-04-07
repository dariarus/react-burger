import React, {FunctionComponent} from "react";
import {Link, useLocation} from "react-router-dom";

import feedWrapper from "./feed-page.module.css";

import {CreatedOrder} from "../../components/created-order/created-order";
import {CreatedOrdersStatistics} from "../../components/order-statistics/order-statistics";
import {useEffect} from "react";
import {useAppDispatch, useSelector} from "../../services/types/hooks";

import {ordersFeedSlice} from "../../services/toolkit-slices/orders-feed";

export const FeedPage: FunctionComponent = () => {
  const {ordersFeedState} = useSelector(state => {
    return state;
  })
  const actionsOrdersFeed = ordersFeedSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionsOrdersFeed.wsInit());
  }, [actionsOrdersFeed, dispatch])

  const location = useLocation();

  return (
    <>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={feedWrapper.section}>
        <div className={feedWrapper.feed}>
          {
            ordersFeedState.orders.map((order, index) => (
              <div className={feedWrapper.feedItem} key={index}>
                <Link to={{
                  pathname: `feed/${order._id}`,
                  state: {background: location}
                }}
                      className={`text text_type_main-medium ${feedWrapper.link}`}
                >
                  <CreatedOrder order={order}/>
                </Link>
              </div>)
            )
          }
        </div>
        <CreatedOrdersStatistics/>
      </div>
    </>
  )
}
