import React from 'react';
import {useSelector} from "react-redux";

import ingredientDetailsStyle from './ingredient-details.module.css';
import {BurgerContext} from "../services/burger-context";

//import {ingredientProperties} from "../../utils/burger-data";

export function IngredientDetails() {
  //const {state} = React.useContext(BurgerContext);
  const {modalState} = useSelector(state => {
      return state
    });

  return (
    <div className={ingredientDetailsStyle.container}>
      <h1 className={`pt-3 text text_type_main-large ${ingredientDetailsStyle.heading}`}>Детали ингредиента</h1>
      {
        modalState.ingredientForModal &&
        Array.of(modalState.ingredientForModal).map(ingredient => (
            <React.Fragment key={ingredient._id}>
              <img src={ingredient.image_large} alt={ingredient.name}/>
              <p className="text text_type_main-medium">{ingredient.name}</p>
              <ul className={ingredientDetailsStyle.wrapper}>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </li>
              </ul>
            </React.Fragment>
          )
        )}
    </div>
  )
}
