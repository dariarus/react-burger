import React, {FunctionComponent} from 'react';
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {useHistory, useRouteMatch} from "react-router-dom";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientsStyle from "./ingredient.module.css";

import {handleModalSlice} from "../../services/toolkit-slices/modal";

import {TDraggableIngredient} from "../../services/types/data";
import {useSelector} from "../../services/types/hooks";

export const Ingredient: FunctionComponent<TDraggableIngredient> = (props) => {

  const {ingredientCounter} = useSelector(state => {
    return state
  })

  const dispatch = useDispatch();
  const actionsModal = handleModalSlice.actions;

  const [{isDragging}, dragRef] = useDrag({
    type: 'ingredient',
    item: props.ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div ref={dragRef}
         className={isDragging ? `${ingredientsStyle.dragging} ${ingredientsStyle.card}` : `${ingredientsStyle.card}`}
         onClick={() => {
             dispatch(actionsModal.setIngredientForModal(props.ingredient));
             dispatch(actionsModal.handleModalOpen({
               modalIngredientDetailsOpened: true
             }))
         }}
         draggable>
      {
        ingredientCounter.selectedIngredients.includes(props.ingredient) &&
        <Counter
          count={props.ingredient.type === 'bun'
            ? ingredientCounter.selectedIngredients.reduce((acc, cur) => cur === props.ingredient ? acc + 2 : acc, 0)
            : ingredientCounter.selectedIngredients.reduce((acc, cur) => cur === props.ingredient ? acc + 1 : acc, 0)
          }
          size="default"/>
      }
      <img src={props.image} alt={props.name} className="pr-4 pl-4"/>
      <div className={`pt-1 pb-1 ${ingredientsStyle.wrapper}`}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${ingredientsStyle.text}`}>{props.name}</p>
    </div>
  )
}

// Ingredient.propTypes = {
//   ingredient: PropTypes.object.isRequired,
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired
// }
