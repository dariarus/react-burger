import React from "react";

import ingredientsWrapper from './burger-ingredients.module.css';

import {burgerData, ingredientTypeRuName} from "../../utils/burger-data.js";
import {RenderIngredientGroup} from "../render-ingredient-group/render-ingredient-group.jsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";


export function BurgerIngredients() {
  const sauce = React.useRef(null);
  const bun = React.useRef(null);
  const filling = React.useRef(null);
  const [current, setCurrent] = React.useState('one')

  function scroll(element) {
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }

  return (
    <>
      <div className={ingredientsWrapper.burgerIngredients}>
        <div style={{position: 'absolute', top: '0', left: '0', zIndex: '100'}}>

          <div style={{display: 'flex'}} className="pt-5">

            <Tab value="buns" active={current === 'buns'}
                 onClick={(value) => {
                   setCurrent(value);
                   scroll(bun.current)
                 }}>
              Булки
            </Tab>

            <Tab value="sauces" active={current === 'sauces'}
                 onClick={(value) => {
                   setCurrent(value);
                   scroll(sauce.current)
                 }}>
              Соусы
            </Tab>

            <Tab value="filling" active={current === 'filling'}
                 onClick={(value) => {
                   setCurrent(value);
                   scroll(filling.current)
                 }}>
              Начинки
            </Tab>

          </div>
        </div>

        {
          <div className={ingredientsWrapper.layout}>
            <RenderIngredientGroup groupName={ingredientTypeRuName.bun}
                                   groupItems={
                                     burgerData.filter(burgerItem => burgerItem.type === 'bun')
                                   }
                                   ref={bun}
            />
            <RenderIngredientGroup groupName={ingredientTypeRuName.sauce}
                                   groupItems={
                                     burgerData.filter(burgerItem => burgerItem.type === 'sauce')
                                   }
                                   ref={sauce}
            />
            <RenderIngredientGroup groupName={ingredientTypeRuName.main}
                                   groupItems={
                                     burgerData.filter(burgerItem => burgerItem.type === 'main')
                                   }
                                   ref={filling}
            />
          </div>
        }
      </div>
    </>
  )
}
