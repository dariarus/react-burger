import React from 'react';
import PropTypes from 'prop-types';

import burgerIngredientStyle from "./ingredient-group.module.css";

import {Ingredient} from "../ingredients/ingredient.jsx";

export const IngredientGroup = React.forwardRef((props, ref) => {
  return (
    <>
      <h2 ref={ref}
          className={`pt-10 text text_type_main-medium ${burgerIngredientStyle.heading}`}>{props.groupName}</h2>
      <div className={burgerIngredientStyle.grid}>
        {
          props.groupItems.map(burgerItem => (
            <Ingredient image={burgerItem.image} name={burgerItem.name}
                        price={burgerItem.price}/>
          ))
        }
      </div>
    </>
  )
})

IngredientGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupItems: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired
}
