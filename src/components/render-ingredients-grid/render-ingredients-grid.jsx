import React from "react";

import ingredientsWrapper from './render-Ingredients-grid.module.css';

import {burgerData, ingredientTypeRuName, ingredientTypeOrder} from "../../utils/burger-data.js";
import {Tabulation} from '../tabulation/tabulation.jsx';
import {RenderIngredientGroup} from "../render-ingredient-group/render-ingredient-group.jsx";

function groupBy(resultObject, item) {
  let existingProperty = resultObject[item.type];
  if (!existingProperty) {
    resultObject[item.type] = [];
  }
  resultObject[item.type].push(item);
  return resultObject;
}

let groupBurgerIngredient = burgerData.reduce(groupBy, {})

export function BurgerIngredients() {
  return (
<>
        <div className={ingredientsWrapper.layout}>
          <Tabulation/>
          {
            Object.keys(groupBurgerIngredient)  /*получаем список свойств объекта и превращаем их массив с пом. Object.keys */
              .sort((a, b) => {
                return ingredientTypeOrder[a] - ingredientTypeOrder[b] // отсортировать массив ключей так, чтобы поле булок шли соусы, а за ними начинка
              })
              .map((key) => (
                <RenderIngredientGroup
                  groupName={ingredientTypeRuName[key]} // [key] - вызов самого названия ключа, а не его значения
                  groupItems={groupBurgerIngredient[key]}
                  id={key}/>
              ))
          }
        </div>
        <div className={ingredientsWrapper.layout}>

        </div>
  </>
  )
}
