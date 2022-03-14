import React from 'react';
import {Link, useLocation} from "react-router-dom";

import burgerIngredientStyle from "./ingredient-group.module.css";

import {Ingredient} from "../ingredients/ingredient";

import {TIngredientGroup, TLocationState} from '../../services/types/data';

export const IngredientGroup = React.forwardRef<HTMLDivElement, TIngredientGroup>((props, ref) => {
  let location = useLocation<TLocationState>();

  return (
    <div ref={ref}>
      <h2 className="pt-10 text text_type_main-medium">{props.groupName}</h2>
      <div className={burgerIngredientStyle.grid}>
        {
          props.groupItems.map(burgerItem => (
            <React.Fragment key={burgerItem._id}>
              <Link to={{
                pathname: `ingredient/${burgerItem._id}`,
                state: {background: location}
              }}
                    className={`text text_type_main-medium ${burgerIngredientStyle.link}`}
              >
                <Ingredient ingredient={burgerItem}
                            image={burgerItem.image} name={burgerItem.name}
                            price={burgerItem.price}
                            key={burgerItem._id}/>
              </Link>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
});
