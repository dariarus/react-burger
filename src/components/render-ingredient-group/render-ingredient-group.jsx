import React from 'react';

import burgerIngredientsStyle from "../burger-ingredients/burger-ingredients.module.css";

import {RenderIngredients} from "../burger-ingredients/burger-ingredients.jsx";

export function RenderIngredientGroup(props) {
  return (
    <>
      <h2 className="pt-10 text text_type_main-medium" id={props.id}>{props.groupName}</h2>
      <div className={burgerIngredientsStyle.grid}>
        {
          props.groupItems.map(burgerItem => (
            <RenderIngredients image={burgerItem.image} name={burgerItem.name}
                               price={burgerItem.price}/>
          ))
        }
      </div>
    </>
  )
}
