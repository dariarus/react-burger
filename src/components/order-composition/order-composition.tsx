import React, {FunctionComponent} from "react";

import orderComposition from './order-composition.module.css';

import {IngredientIcon} from "../ingredient-icon/ingredient-icon";

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {TOrderComposition} from "../../services/types/data";

export const OrderComposition: FunctionComponent<TOrderComposition> = (props) => {
  return (
    <div className={orderComposition.wrapper}>
      <div className={orderComposition.part}>
        <IngredientIcon image={props.image} imageName={props.name}/>
        <p className="ml-4 text text_type_main-default">{props.name}</p>
      </div>
      <div className={orderComposition.part}>
        <p className="mr-2 ml-4 text text_type_digits-default">
          {
            props.type === 'bun'
              ? `2 x ${props.price}`
              : props.ingredientCount > 1
                ? `${props.ingredientCount} x ${props.price}`
                : `1 x ${props.price}`
          }
        </p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}
