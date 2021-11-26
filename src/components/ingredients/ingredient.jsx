import React from 'react';
import PropTypes from 'prop-types';

import ingredientsStyle from "./ingredient.module.css";

import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export function Ingredient(props) {

  return (
    <div className={ingredientsStyle.card} onClick={() => {
      props.setSelectedIngredientId(props.ingredientId);
      props.handleOnClick();
    }}>
      <Counter count={1} size="default" />
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
  setSelectedIngredientId: PropTypes.func.isRequired,
  ingredientId: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
