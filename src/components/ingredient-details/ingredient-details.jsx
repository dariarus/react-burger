import React from 'react';

import ingredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from "prop-types";

export function IngredientDetails(props) {
  return (
    <div className={ingredientDetailsStyle.container}>
      <h1 className={`pt-3 text text_type_main-large ${ingredientDetailsStyle.heading}`}>Детали ингредиента</h1>
      {props.ingredientProperties
        .filter(ingredientProperty => {
          return props.selectedIngredientId === ingredientProperty._id
        })
        .map(property => (
            <>
              <img src={property.image_large} alt={property.name}/>
              <p className="text text_type_main-default">{property.name}</p>
              <div className={ingredientDetailsStyle.wrapper}>
                <div className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.calories}</p>
                </div>
                <div className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.proteins}</p>
                </div>
                <div className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.fat}</p>
                </div>
                <div className={ingredientDetailsStyle.properties}>
                  <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                  <p className="mt-2 text text_type_digits-default text_color_inactive">{property.carbohydrates}</p>
                </div>
              </div>
            </>
          )
        )}
    </div>
  )
}

IngredientDetails.propTypes = {
  selectedIngredientId: PropTypes.string.isRequired,
  ingredientProperties: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  })).isRequired,
}
