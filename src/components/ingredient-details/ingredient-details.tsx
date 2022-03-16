import React, {FunctionComponent, useState} from 'react';

import { useSelector} from "../../services/types/hooks";

import ingredientDetailsStyle from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import {TIngredient} from "../../services/types/data";

export const IngredientDetails: FunctionComponent = () => {
  const { burgerDataState } = useSelector(state => {
    return state
  });
  const [ingredient, setIngredient] = useState<TIngredient | undefined>(undefined);

  const params: {id: string} = useParams();
  React.useEffect(() => {
    const findResult = burgerDataState.burgerData.find(element => element._id === params.id)
   setIngredient(findResult)
  }, [burgerDataState, params.id])


  return (
    <div className={ingredientDetailsStyle.container}>
      <h1 className={`pt-3 text text_type_main-large ${ingredientDetailsStyle.heading}`}>Детали ингредиента</h1>
      {
        ingredient &&
        <React.Fragment key={ingredient._id}>
          <img src={ingredient.image_large} alt={ingredient.name} />
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
      }
    </div>
  )
}
