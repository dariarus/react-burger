import React from 'react';

import burgerIngredientsStyle from "../render-ingredients/render-ingredients.module.css";

import {RenderIngredients} from "../render-ingredients/render-ingredients.jsx";

export const RenderIngredientGroup = React.forwardRef((props, ref) => {
  return (
    <>
      <h2 ref={ref} className={`pt-10 text text_type_main-medium`}>{props.groupName}</h2>
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
})
