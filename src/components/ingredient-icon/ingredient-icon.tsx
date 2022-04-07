import React, {FunctionComponent} from "react";

import ingredientIcon from './ingredient-icon.module.css';

import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredientIcon} from "../../services/types/data";

export const IngredientIcon: FunctionComponent<TIngredientIcon> = (props) => {
  return (
    <div className={ingredientIcon.roundDiv}>
      <div className={ingredientIcon.moduleBorderWrap}>
        {
          props.isSixth && props.index === 0
            ? <div className={ingredientIcon.module}>
              <p className={`text text_type_main-default ${ingredientIcon.counter}`}>{`+${props.restCount}`}</p>
              <div className={ingredientIcon.sixthIngredient}>
                <img className={ingredientIcon.image} src={props.image} alt={props.imageName}/>
              </div>
            </div>
            : <div className={ingredientIcon.module}>
              <img className={ingredientIcon.image} src={props.image} alt={props.imageName}/>
            </div>
        }
        {
          props.ingredientCount && props.ingredientCount > 1 &&
          <Counter count={props.ingredientCount} size="small"/>
        }
      </div>
    </div>
  )
}
