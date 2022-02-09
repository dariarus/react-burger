import React from 'react';

import burgerIngredientStyle from "./ingredient-group.module.css";

import {Ingredient} from "../ingredients/ingredient";

import {TIngredientGroup} from '../../services/types/data';

export const IngredientGroup = React.forwardRef<HTMLDivElement, TIngredientGroup>((props, ref) => {
  return (
    <div ref={ref}>
      <h2 className="pt-10 text text_type_main-medium">{props.groupName}</h2>
      <div className={burgerIngredientStyle.grid}>
        {
          props.groupItems.map(burgerItem => (
            <Ingredient ingredient={burgerItem}
                        image={burgerItem.image} name={burgerItem.name}
                        price={burgerItem.price}
                        key={burgerItem._id}/>
          ))
        }
      </div>
    </div>
  )
});
