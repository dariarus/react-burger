import React, {FunctionComponent} from 'react';
import {useDrop} from "react-dnd";
import {useHistory} from "react-router-dom";

import {doOrder} from "../../services/actions/api";

import burgerConstructor from "./burger-constructor.module.css";
import bunImage from '../../images/logo.svg';

import {ConstructorElementDraggable} from '../constructor-element-draggable/constructor-element-draggable';
import {burgerConstructorSlice} from "../../services/toolkit-slices/burger-constructor";
import {handleModalSlice} from "../../services/toolkit-slices/modal";
import {ingredientCounterSlice} from "../../services/toolkit-slices/ingredient-counter"
import {totalPriceSlice} from "../../services/toolkit-slices/total-price";

import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import {TIngredient} from "../../services/types/data";
import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {calculateTotalPrice} from "../../utils/burger-data";

export const BurgerConstructor: FunctionComponent = () => {

  const {burgerConstructorIngredients, totalPrice, userData} = useSelector(state => {
    return state
  });
  const dispatch = useAppDispatch();

  const actionsConstructor = burgerConstructorSlice.actions;
  const actionsModal = handleModalSlice.actions;
  const actionsTotalPrice = totalPriceSlice.actions;
  const actionsIngredientCounter = ingredientCounterSlice.actions;

  const history = useHistory();
  const login = React.useCallback(() => {
      history.replace({ pathname: '/login' });
    },
    [history]
  );

  const createCommonArrayOfIngredientsIds = () => {
    const commonArrayOfIngredientsIds = burgerConstructorIngredients.ingredients.map(itemWithId => itemWithId.item._id);
    if (burgerConstructorIngredients.bun) {
      commonArrayOfIngredientsIds.unshift(burgerConstructorIngredients.bun._id);
    }
    return commonArrayOfIngredientsIds;
  }

  const calculateTotalPriceCallback = React.useCallback(() => {
    return calculateTotalPrice(burgerConstructorIngredients.bun, burgerConstructorIngredients.ingredients.map(ingredientItem => ingredientItem.item));
  }, [burgerConstructorIngredients.bun, burgerConstructorIngredients.ingredients])

  const [{isOver}, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: TIngredient) => {
      dispatch(actionsConstructor.addIngredientToOrder(item));
      dispatch(actionsIngredientCounter.counterIncrement(item))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  React.useEffect(() => {
    dispatch(actionsTotalPrice.setTotalPrice(calculateTotalPriceCallback()))
  }, [burgerConstructorIngredients, dispatch, actionsTotalPrice, calculateTotalPriceCallback])

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
              text="Перетащите сюда булку из списка слева (верх)"
              price={0}
              thumbnail={bunImage}
            />
        }
      </div>

      <div
        className={isOver ? `${burgerConstructor.constructor} ${burgerConstructor.overingredient}` : `${burgerConstructor.constructor}`}>
        {
          burgerConstructorIngredients.ingredients && burgerConstructorIngredients.ingredients.map((itemWithId, index) => (
            <ConstructorElementDraggable
              key={itemWithId.uniqueId}
              itemWithId={itemWithId}
              index={index}/>
          ))}
      </div>

      <div
        className={isOver ? `${burgerConstructor.bottom} ${burgerConstructor.overbun}` : `${burgerConstructor.bottom}`}>
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
              text="Перетащите сюда булку из списка слева (низ)"
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
        <div className="ml-10">
          <Button type="primary" size="large" onClick={() => {
            login(); // исп-е useHistory для авторизации польз-ля перед отправкой заказа
            if (userData.user.name !== '' && userData.user.email !== ''){
              dispatch(doOrder(createCommonArrayOfIngredientsIds(), burgerConstructorIngredients));
              dispatch(actionsModal.handleModalOpen({
                modalOrderNumberDetailsOpened: true
              }));
            }
          }}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
}
