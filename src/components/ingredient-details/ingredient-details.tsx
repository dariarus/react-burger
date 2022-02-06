import React, {FunctionComponent} from 'react';

import { useSelector} from "../../services/types/hooks";

import ingredientDetailsStyle from './ingredient-details.module.css';

export const IngredientDetails: FunctionComponent = () => {
  const { modalState } = useSelector(state => {
    return state
  });

  return (
    <div className={ingredientDetailsStyle.container}>
      <h1 className={`pt-3 text text_type_main-large ${ingredientDetailsStyle.heading}`}>Детали ингредиента</h1>
      {
        modalState.ingredientForModal &&
        <React.Fragment key={modalState.ingredientForModal._id}>
          <img src={modalState.ingredientForModal.image_large} alt={modalState.ingredientForModal.name} />
          <p className="text text_type_main-medium">{modalState.ingredientForModal.name}</p>
          <ul className={ingredientDetailsStyle.wrapper}>
            <li className={ingredientDetailsStyle.properties}>
              <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">{modalState.ingredientForModal.calories}</p>
            </li>
            <li className={ingredientDetailsStyle.properties}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">{modalState.ingredientForModal.proteins}</p>
            </li>
            <li className={ingredientDetailsStyle.properties}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">{modalState.ingredientForModal.fat}</p>
            </li>
            <li className={ingredientDetailsStyle.properties}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">{modalState.ingredientForModal.carbohydrates}</p>
            </li>
          </ul>
        </React.Fragment>
      }
    </div>
  )
}
