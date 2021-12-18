import React from 'react';
import PropTypes from 'prop-types';

import {BurgerContext, BurgerContextIngredients} from "../services/burger-context.js";

import burgerConstructor from "./burger-constructor.module.css";
import bunImage from '../../images/logo.svg';
import {ingredientProperties} from "../../utils/burger-data.js";

import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";


/****/
export function BurgerConstructor(props) {
  const {dispatchIngredients} = React.useContext(BurgerContextIngredients);
  const {state, statePrice, dispatchTotalPrice} = React.useContext(BurgerContext);

  return (
    <div className={burgerConstructor.container}>
      <div className={burgerConstructor.top}>
        {
          state.selectedIngredients.bun ? Array.of(state.selectedIngredients.bun).map(item => (
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
          state.selectedIngredients.ingredients && state.selectedIngredients.ingredients.map((item, index) => (
            // Array.of(state.burgerData.filter(burgerItem => (state.selectedItemsId.ingredients.map(ingredientId => burgerItem._id === ingredientId)))).map(item => (
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
                  dispatchIngredients({
                    type: "deleteIngredientFromOrder",
                    index: index
                  });
                }}
              />
            </div>
          ))}
      </div>

      <div className={burgerConstructor.bottom}>
        {
          state.selectedIngredients.bun ? Array.of(state.selectedIngredients.bun)
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
          {statePrice.totalPrice}
        </h2>
        <div className={burgerConstructor.icon}>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" className="ml-10" onClick={() => {
          props.handleOnClick("modalOrderDetailsOpened")
        }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  // burgerData: ingredientProperties,
  handleOnClick: PropTypes.func.isRequired
}
