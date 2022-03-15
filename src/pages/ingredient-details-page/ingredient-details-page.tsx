import React, {FunctionComponent} from "react";

import ingredientDetailsPage from './ingredient-details-page.module.css';

import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";

export const IngredientDetailsPage: FunctionComponent = () => {

  return (
    <div className={ingredientDetailsPage.wrapper}>
        <IngredientDetails/>
    </div>
  )
}
