import React, {FunctionComponent} from "react";

import ingredientIcon from './ingredient-icon.module.css';

export const IngredientIcon: FunctionComponent = () => {
  return (
    <div className={ingredientIcon.roundDiv}>
      <div className={ingredientIcon.moduleBorderWrap}>
        <div className={ingredientIcon.module}>
          {/*<p className="ml-4">1</p>*/}
          <img className={ingredientIcon.image} src="" alt=""/>
        </div>
      </div>
    </div>
  )
}
