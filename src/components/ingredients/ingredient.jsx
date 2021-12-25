import React from 'react';
import PropTypes from 'prop-types';

import ingredientsStyle from "./ingredient.module.css";

import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {handleModalSlice} from "../services/toolkit-slices/modal";
import {burgerConstructorSlice} from "../services/toolkit-slices/burger-constructor";
import {useDispatch} from "react-redux";

export function Ingredient(props) {

  const dispatch = useDispatch();
  const actionsModal = handleModalSlice.actions;
  const actionsConstructor = burgerConstructorSlice.actions;

  return (
    <div className={ingredientsStyle.card} onClick={() => {
      dispatch(actionsModal.setIngredientForModal(props.ingredient));
      dispatch(actionsModal.handleModal_open({
        modalIngredientDetailsOpened: true
      }));
      dispatch(actionsConstructor.addIngredientToOrder(props.ingredient))
    }}>
      <Counter count={1} size="default"/>
      <img src={props.image} alt={props.name} className="pr-4 pl-4"/>
      <div className={`pt-1 pb-1 ${ingredientsStyle.wrapper}`}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${ingredientsStyle.text}`}>{props.name}</p>
    </div>
  )
}

Ingredient.propTypes = {
//  setIngredientForModal: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
 // handleOnClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
