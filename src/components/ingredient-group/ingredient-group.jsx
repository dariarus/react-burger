import React from 'react';
import PropTypes from 'prop-types';

import burgerIngredientStyle from "./ingredient-group.module.css";

import {Ingredient} from "../ingredients/ingredient.jsx";
import {ingredientProperties} from "../../utils/burger-data";

export const IngredientGroup = React.forwardRef((props, ref) => {
  return (
    <>
      <h2 ref={ref}
          className="pt-10 text text_type_main-medium">{props.groupName}</h2>
      <div className={burgerIngredientStyle.grid}>
        {
          props.groupItems.map(burgerItem => (
            <Ingredient ingredient={burgerItem}
                        image={burgerItem.image} name={burgerItem.name}
                        price={burgerItem.price} handleOnClick={props.handleOnClick}
                        ingredientId={burgerItem._id}
                        ingredientType={burgerItem.type}
                        setIngredientIdForModal={props.setIngredientIdForModal}
                        key={burgerItem._id}/>
          ))
        }
      </div>
    </>
  )
})

IngredientGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupItems: ingredientProperties,
  handleOnClick: PropTypes.func.isRequired,
  setIngredientIdForModal: PropTypes.func.isRequired
}
