import React from 'react';
import PropTypes from 'prop-types';

import ingredientsStyle from "./ingredient.module.css";

import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerContextIngredients} from "../services/burger-context";

export function Ingredient(props) {
  const {dispatchIngredients} = React.useContext(BurgerContextIngredients);

  return (
    <div className={ingredientsStyle.card} onClick={() => {
      props.setIngredientForModal(props.ingredient);
      props.handleOnClick();
      dispatchIngredients({
        type: "addIngredientToOrder",
        ingredient: props.ingredient
      });
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
  setIngredientForModal: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
