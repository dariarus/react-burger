import React from 'react';

import renderIngredientsStyle from "./render-ingredients.module.css";

import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";


export function RenderIngredients(props) {
  return (
    <div className={renderIngredientsStyle.card}>
      <Counter count={1} size="default" />
      <img src={props.image} alt={props.name} className="pr-4 pl-4"/>
      <div style={{display: "flex", alignContent: "center"}} className="pt-1 pb-1">
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${renderIngredientsStyle.text}`}>{props.name}</p>
    </div>
  )

}
