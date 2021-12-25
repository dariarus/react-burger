import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {doOrder} from "../../utils/api";

import burgerConstructor from "./burger-constructor.module.css";
import bunImage from '../../images/logo.svg';

import {burgerConstructorSlice} from "../services/toolkit-slices/burger-constructor.js";
import {handleModalSlice} from "../services/toolkit-slices/modal";

import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {totalPriceSlice} from "../services/toolkit-slices/total-price";

export function BurgerConstructor() {

  const {burgerConstructorIngredients, totalPrice} = useSelector(state => {
    return state
  });
  const dispatch = useDispatch();

  const actionsConstructor = burgerConstructorSlice.actions;
  const actionsModal = handleModalSlice.actions;
  const actionsTotalPrice = totalPriceSlice.actions;

  const createCommonArrayOfIngredientsIds = () => {
    const commonArrayOfIngredientsIds = burgerConstructorIngredients.ingredients.map(item => item._id);
    if (burgerConstructorIngredients.bun) {
      commonArrayOfIngredientsIds.unshift(burgerConstructorIngredients.bun._id);
    }
    return commonArrayOfIngredientsIds;
  }

  const calculateTotalPrice = () => {
    const ingredientArrayReducer = (acc, item) => {
      return acc + item.price
    }
    let bunPrice = 0;
    if (burgerConstructorIngredients.bun) {
      bunPrice = burgerConstructorIngredients.bun.price * 2;
    }
    let ingredientPrice = burgerConstructorIngredients.ingredients.reduce(ingredientArrayReducer, 0);
    return ingredientPrice + bunPrice;
  }

  React.useEffect(() => {
    dispatch(actionsTotalPrice.setTotalPrice(calculateTotalPrice()))
  }, [burgerConstructorIngredients])

  return (
    <div className={burgerConstructor.container}>
      <div className={burgerConstructor.top}>
        {
          burgerConstructorIngredients.bun
            ? Array.of(burgerConstructorIngredients.bun).map(item => (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
                key={`top:${item._id}`}
              />
            ))
            : <ConstructorElement
              type="top"
              isLocked={true}
              text="Выберите булку из списка слева (верх)"
              price={0}
              thumbnail={bunImage}
            />
        }
      </div>

      <div className={burgerConstructor.constructor}>
        {
          burgerConstructorIngredients.ingredients && burgerConstructorIngredients.ingredients.map((item, index) => (
            <div className={burgerConstructor.wrapper}
                 key={index}>
              <div className="mr-1">
                <DragIcon type="primary"/>
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => {
                  dispatch(actionsConstructor.deleteIngredientFromOrder(index));
                }}
              />
            </div>
          ))}
      </div>

      <div className={burgerConstructor.bottom}>
        {
          burgerConstructorIngredients.bun
            ? Array.of(burgerConstructorIngredients.bun)
              .map((item) => (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                  key={`bottom:${item._id}`}
                />
              ))
            : <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Выберите булку из списка слева (низ)"
              price={0}
              thumbnail={bunImage}
            />
        }
      </div>
      <div className={burgerConstructor.order}>
        <h2 className="text text_type_digits-medium mr-2">
          {totalPrice.totalPrice}
        </h2>
        <div className={burgerConstructor.icon}>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" className="ml-10" onClick={() => {
          console.log(`Это оно: ${burgerConstructorIngredients.bun}`)
          if (burgerConstructorIngredients.bun) {
            dispatch(doOrder(createCommonArrayOfIngredientsIds()));
          }
          dispatch(actionsModal.handleModal_open({
            modalOrderDetailsOpened: true
          }));
        }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
