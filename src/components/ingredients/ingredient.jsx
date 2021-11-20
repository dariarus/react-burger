import React from 'react';
import PropTypes from 'prop-types';

import ingredientsStyle from "./ingredient.module.css";

import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export function Ingredient(props) {
  Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }

  return (
    <div className={ingredientsStyle.card}>
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
