import React, {FunctionComponent, useEffect} from "react";
import order from './created-order.module.css';

import {IngredientIcon} from "../ingredient-icon/ingredient-icon";

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {TIngredient, TIngredientItem, TOrders, TReducedCounter} from "../../services/types/data";
import {totalPriceSlice} from "../../services/toolkit-slices/total-price";
import {calculateTotalPrice} from "../../utils/burger-data";

export const CreatedOrder: FunctionComponent<{ order: TOrders }> = (props) => {
  const {burgerDataState} = useSelector(state => {
    return state;
  })
  const actionsTotalPrice = totalPriceSlice.actions;
  const dispatch = useAppDispatch();

  /***---- date format ----***/
  const orderDateTime = new Date(props.order.createdAt);
  // const day = orderDateTime.toLocaleDateString('ru-RU', {month: 'long', day: 'numeric'}) // '3 апреля'

  /*** cut hours after getting new Date objects ***/
  const orderDate = new Date(props.order.createdAt);
  const orderDateMidnight = orderDate.setHours(0, 0, 0, 0);
  const nowDate = new Date();
  const nowDateMidnight = nowDate.setHours(0, 0, 0, 0);

  const dayMs = 86400000 // = 1000мс * 60сек * 60мин * 24ч

  const differenceInDays = (orderDateMidnight - nowDateMidnight) / dayMs;
  let actualCompletionTime;
  if (differenceInDays < -3) {
    actualCompletionTime = orderDate.toLocaleDateString('ru-RU');
  } else {
    actualCompletionTime = new Intl.RelativeTimeFormat('ru', {numeric: "auto"})
      .format(differenceInDays, 'day');
  }

  /*** create string with actual Date data of order creating ***/
  const orderCreatedAt = `${actualCompletionTime}, ${orderDateTime.getHours() >= 10
    ? orderDateTime.getHours()
    : "0" + orderDateTime.getHours()}:${orderDateTime.getMinutes() >= 10
    ? orderDateTime.getMinutes()
    : "0" + orderDateTime.getMinutes()} i-GMT${orderDateTime.getTimezoneOffset() <= 0
    ? "+" + orderDateTime.getTimezoneOffset() / -60
    : "-" + orderDateTime.getTimezoneOffset() / -60}`;

  /***---- separating bun and pushing it to start ----***/
  const burgerIngredient = props.order.ingredients
    .map((orderIngredient) => burgerDataState.burgerData.find(ingredient => ingredient._id === orderIngredient));
  let burgerIngredientBunSorted = burgerIngredient;
  const indexOfBun = burgerIngredient.findIndex(ingredient => ingredient && ingredient.type === 'bun');
  if (indexOfBun !== 0) {
    burgerIngredientBunSorted = burgerIngredient.splice(indexOfBun, 1);
    burgerIngredientBunSorted = burgerIngredientBunSorted.concat(burgerIngredient);
  }
  burgerIngredientBunSorted = burgerIngredientBunSorted
    .filter((ingredient, index, array) => array.indexOf(ingredient) === index);

  /*** if ingredient-array is longer than 6 ***/
  // const cutCount = burgerIngredientBunSorted.length;
  const burgerIngredientSixFirst = burgerIngredientBunSorted.slice(0, 6);
  // const burgerIngredientRest = burgerIngredientBunSorted.splice(6, cutCount);
  // const countOfRestedIngredients = burgerIngredientRest.length;

  let restIngredientCount = 0;
  if (burgerIngredientBunSorted.length > 6) {
    restIngredientCount = burgerIngredientBunSorted.length - 6;
  }

  function countNotUniqueIngredients(array: ReadonlyArray<string>) {
    return array.reduce(function (counter: TReducedCounter, idValue: string) {
      counter[idValue] ? counter[idValue]++ : counter[idValue] = 1;
      return counter;
    }, {});
  }

  const countOfDuplicatedIngredients = countNotUniqueIngredients(props.order.ingredients);

  /***---- total price ----***/
  const burgerIngredientPrice = burgerIngredient.map(ingredient => ingredient && ingredient.price)
  // function countTotalPrice(array: ReadonlyArray<TIngredient>) {
  //   return array.reduce((acc: number, price: number) => {
  //    return acc + price
  //   }, 0)
  // }

  useEffect(() => {
    let newBurgerIngredient: {bun: TIngredient | null | undefined, ingredients: Array<TIngredient> } = {
      bun: undefined,
      ingredients: []
    };
    newBurgerIngredient.bun = burgerIngredient.find(bun => bun && bun.type === "bun" && bun) || null;
    newBurgerIngredient.ingredients = burgerIngredient.filter(ingredient => ingredient && (ingredient.type === "main" || ingredient.type === "sauce") && ingredient);
    calculateTotalPrice(newBurgerIngredient.bun, newBurgerIngredient.ingredients);
    console.log(calculateTotalPrice(newBurgerIngredient.bun, newBurgerIngredient.ingredients))
  }, [])


  return (
    <div className={order.wrapper}>
      <div className={order.preview}>
        <p className="text text_type_digits-default">{`#${props.order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">{orderCreatedAt}</p>
      </div>
      <h2 className={`mb-6 text text_type_main-medium ${order.burgerName}`}>{props.order.name}</h2>
      <div className={order.ingredients}>
        <div className={order.ingredientsWrapper}>
          {
            burgerIngredientBunSorted.length <= 6
              ? burgerIngredientBunSorted.reverse().map((ingredient, index) => ingredient && ingredient.name && ingredient.image // получаем ingredient - чтобы он при поиске не был undefined
                && <IngredientIcon image={ingredient.image} imageName={ingredient.name} isSixth={false}
                                   ingredientCount={countOfDuplicatedIngredients[ingredient._id]}/>)
              : burgerIngredientSixFirst.reverse().map((ingredient, index) => ingredient && ingredient.name && ingredient.image // получаем ingredient - чтобы он при поиске не был undefined
                && <IngredientIcon image={ingredient.image} imageName={ingredient.name} isSixth={true} index={index}
                                   restCount={restIngredientCount}
                                   ingredientCount={countOfDuplicatedIngredients[ingredient._id]}/>
              )
          }

        </div>
        <div className={order.price}>
          <p className="mr-2 text text_type_digits-default">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}
