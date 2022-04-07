import React, {FunctionComponent, useState} from "react";
import {useParams} from "react-router-dom";

import {useSelector} from "../../services/types/hooks";

import orderDetails from './order-details.module.css';

import {OrderComposition} from "../order-composition/order-composition";

import {TOrders} from "../../services/types/data";

import {
  calculateTotalPrice, countNotUniqueIngredients, cutDuplicatesFromArray,
  defineActualOrderDateInformation, mapBunAndIngredientsFromArray,
  mapBurgerIngredientFromId, replaceBunToStart
} from "../../utils/burger-data";

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails: FunctionComponent = () => {
  const {ordersFeedState, burgerDataState} = useSelector((state) => {
    return state;
  })

  const [order, setOrder] = useState<TOrders | undefined>(undefined);

  const params: { id: string } = useParams();
  React.useEffect(() => {
    const findOrderResult = ordersFeedState.orders.find(element => element._id === params.id)
    setOrder(findOrderResult)
  }, [ordersFeedState, params.id])

  let orderIngredients;
  let orderIngredientBunSorted;
  let orderIngredientCutDuplicates;
  let countOfDuplicatedIngredients: { [x: string]: number; };

  let orderTotalPrice;
  let orderCreatedAt;

  if (order) {
    orderIngredients = mapBurgerIngredientFromId(order.ingredients, burgerDataState.burgerData);
    orderIngredientBunSorted = replaceBunToStart(orderIngredients);
    orderIngredientCutDuplicates = cutDuplicatesFromArray(orderIngredientBunSorted);

    countOfDuplicatedIngredients = countNotUniqueIngredients(order.ingredients);

    const newOrderIngredients = mapBunAndIngredientsFromArray(orderIngredientBunSorted)
    orderTotalPrice = calculateTotalPrice(newOrderIngredients.bun, newOrderIngredients.ingredients)
    orderCreatedAt = defineActualOrderDateInformation(order.createdAt);
  }

  return (
    <div className={orderDetails.wrapper}>
      {
        order &&
        <>
          <p className="mb-10 text text_type_digits-default">{`#${order.number}`}</p>
          <h2 className="mb-3 text text_type_main-medium">{order.name}</h2>
          {
            order.status === "done"
              ? <p className={`mb-15 text text_type_main-default ${orderDetails.textDone}`}>Выполнен</p>
              : order.status === "created"
                ? <p className="mb-15 text text_type_main-default">Создан</p>
                : <p className="mb-15 text text_type_main-default">В работе</p>
          }
          <h3 className="mb-6 text text_type_main-medium">Состав:</h3>
          <div className={orderDetails.list}>
            {
              orderIngredientCutDuplicates &&
              orderIngredientCutDuplicates.map((ingredient, index) => (ingredient && ingredient.name && ingredient.image &&
                <OrderComposition key={index} image={ingredient.image} name={ingredient.name} type={ingredient.type}
                                  price={ingredient.price}
                                  ingredientCount={countOfDuplicatedIngredients[ingredient._id]}/>
              ))
            }
          </div>
          <div className={orderDetails.total}>
            <p className="text text_type_main-default text_color_inactive">{orderCreatedAt}</p>
            <div className={orderDetails.count}>
              <p className="mr-2 text text_type_digits-default">{orderTotalPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </>
      }
    </div>
  )
}
