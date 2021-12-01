import React from 'react';
import PropTypes from 'prop-types';

import burgerConstructor from "./burger-constructor.module.css";
import {ingredientProperties} from "../../utils/burger-data.js";

import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {
  return (
    <div className={burgerConstructor.container}>
      <div className={burgerConstructor.top}>
        {
          Array.of(props.burgerData.find(burgerItem => (burgerItem.type === 'bun')))
            .map(item => (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
                key={item._id}
              />
            ))
        }
      </div>

      <div className={burgerConstructor.constructor}>
        {props.burgerData.filter(burgerItem => (burgerItem.type !== 'bun')).map(item => (
          <div className={burgerConstructor.wrapper}
               key={item._id}>
            <div className="mr-1">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>

      <div className={burgerConstructor.bottom}>
        {
          Array.of(props.burgerData.find(burgerItem => (burgerItem.type === 'bun')))
            .map(item => (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
                key={item._id}
              />
            ))
        }
      </div>

      <div className={burgerConstructor.order}>
        <h2 className="text text_type_digits-medium mr-2">00000</h2>
        <div className={burgerConstructor.icon}>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" className="ml-10" onClick={props.handleOnClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  burgerData: ingredientProperties,
  handleOnClick: PropTypes.func.isRequired
}
