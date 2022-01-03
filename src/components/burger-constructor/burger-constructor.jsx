import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { doOrder } from "../../services/actions/api";

import burgerConstructor from "./burger-constructor.module.css";
import bunImage from '../../images/logo.svg';

import { ConstructorElemenetDraggable } from '../constructor-element-draggable/constructor-element-draggable';
import { burgerConstructorSlice } from "../../services/toolkit-slices/burger-constructor.js";
import { handleModalSlice } from "../../services/toolkit-slices/modal";
import { ingredientCounterSlice } from "../../services/toolkit-slices/ingredient-counter"

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { totalPriceSlice } from "../../services/toolkit-slices/total-price";

export function BurgerConstructor() {

  const { burgerConstructorIngredients, totalPrice } = useSelector(state => {
    return state
  });
  const dispatch = useDispatch();

  const actionsConstructor = burgerConstructorSlice.actions;
  const actionsModal = handleModalSlice.actions;
  const actionsTotalPrice = totalPriceSlice.actions;
  const actionsIngredientCounter = ingredientCounterSlice.actions;

  const createCommonArrayOfIngredientsIds = () => {
    const commonArrayOfIngredientsIds = burgerConstructorIngredients.ingredients.map(itemWithId => itemWithId.item._id);
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
    let ingredientPrice = burgerConstructorIngredients.ingredients
      .map(element => element.item)
      .reduce(ingredientArrayReducer, 0);
    return ingredientPrice + bunPrice;
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      dispatch(actionsConstructor.addIngredientToOrder(item));
      dispatch(actionsIngredientCounter.counterIncrement(item))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  React.useEffect(() => {
    dispatch(actionsTotalPrice.setTotalPrice(calculateTotalPrice()))
  }, [burgerConstructorIngredients])

  return (
    <div ref={dropRef}

      className={burgerConstructor.container}>
      <div className={isOver ? `${burgerConstructor.top} ${burgerConstructor.overbun}` : `${burgerConstructor.top}`}>
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

      <div
        className={isOver ? `${burgerConstructor.constructor} ${burgerConstructor.overingredient}` : `${burgerConstructor.constructor}`}>
        {
          burgerConstructorIngredients.ingredients && burgerConstructorIngredients.ingredients.map((itemWithId, index) => (
            <ConstructorElemenetDraggable
              key={itemWithId.uniqueId}
              itemWithId={itemWithId}
              index={index} />
          ))}
      </div>

      <div className={isOver ? `${burgerConstructor.bottom} ${burgerConstructor.overbun}` : `${burgerConstructor.bottom}`}>
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
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" className="ml-10" onClick={() => {
          console.log(`Это оно: ${burgerConstructorIngredients.bun}`)
          if (burgerConstructorIngredients.bun) {
            dispatch(doOrder(createCommonArrayOfIngredientsIds()));
          }
          dispatch(actionsModal.handleModalOpen({
            modalOrderDetailsOpened: true
          }));
        }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
