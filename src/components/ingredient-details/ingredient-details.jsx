import React from 'react';

import ingredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from "prop-types";
import {ingredientProperties} from "../../utils/burger-data";

export function IngredientDetails(props) {
  return (
    <div className={ingredientDetailsStyle.container}>
      <h1 className={`pt-3 text text_type_main-large ${ingredientDetailsStyle.heading}`}>Детали ингредиента</h1>
      {props.ingredientProperties
        .filter(ingredientProperty => {
          return props.ingredientIdForModal === ingredientProperty._id
        })
        .map(property => (
            <React.Fragment key={property._id}>
              <img src={property.image_large} alt={property.name}/>
              <p className="text text_type_main-medium">{property.name}</p>
              <ul className={ingredientDetailsStyle.wrapper}>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.calories}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.proteins}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.fat}</p>
                </li>
                <li className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.carbohydrates}</p>
                </li>
              </ul>
            </React.Fragment>
          )
        )}
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredientIdForModal: PropTypes.string.isRequired,
  ingredientProperties: ingredientProperties
}
