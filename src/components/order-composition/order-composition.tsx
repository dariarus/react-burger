import React, {FunctionComponent} from "react";

import orderComposition from './order-composition.module.css';

import {IngredientIcon} from "../ingredient-in-feed/ingredient-icon";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const OrderComposition: FunctionComponent = () => {
  return (
    <div className={orderComposition.wrapper}>
      <div className={orderComposition.part}>
        <IngredientIcon/>
        <p className="ml-4 text text_type_main-default">Флюоресцентная булка R2-D3</p>
      </div>
      <div className={orderComposition.part}>
        <p className="mr-2 text text_type_digits-default">2 x 20</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}
