import React from "react";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';

import ingredientsWrapper from './burger-ingredients.module.css';

import {IngredientGroup} from "../ingredient-group/ingredient-group.jsx";
import {ingredientTypeRuName} from "../../utils/burger-data.js";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerIngredients() {
  const {burgerDataState} = useSelector(state => {
    return state
  });

  const sauce = React.useRef(null);
  const bun = React.useRef(null);
  const filling = React.useRef(null);
  const [tab, setActiveTab] = React.useState('')

  function scroll(element) {
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }

  return (
    <>
      <div className={ingredientsWrapper.burgerIngredients}>
        <div className={`pt-5 ${ingredientsWrapper.tab}`}>
          <Tab value="buns" active={tab === 'buns'}
               onClick={(value) => {
                 setActiveTab(value);
                 scroll(bun.current)
               }}>
            Булки
          </Tab>

          <Tab value="sauces" active={tab === 'sauces'}
               onClick={(value) => {
                 setActiveTab(value);
                 scroll(sauce.current)
               }}>
            Соусы
          </Tab>

          <Tab value="filling" active={tab === 'filling'}
               onClick={(value) => {
                 setActiveTab(value);
                 scroll(filling.current)
               }}>
            Начинки
          </Tab>
        </div>

        {
          <div className={ingredientsWrapper.layout}>
            <IngredientGroup groupName={ingredientTypeRuName.bun}
                             groupItems={
                               burgerDataState.burgerData.filter(burgerItem => burgerItem.type === 'bun')
                             }
                             ref={bun}
            />
            <IngredientGroup groupName={ingredientTypeRuName.sauce}
                             groupItems={
                               burgerDataState.burgerData.filter(burgerItem => burgerItem.type === 'sauce')
                             }
                             ref={sauce}
            />
            <IngredientGroup groupName={ingredientTypeRuName.main}
                             groupItems={
                               burgerDataState.burgerData.filter(burgerItem => burgerItem.type === 'main')
                             }
                             ref={filling}
            />
          </div>
        }
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  // ingredientTypeRuName: PropTypes.shape({
  //   bun: PropTypes.string.isRequired,
  //   sauce: PropTypes.string.isRequired,
  //   main: PropTypes.string.isRequired,
  // }).isRequired,
 //burgerData: ingredientProperties,
 //  handleOnClick: PropTypes.func.isRequired,
 //  setIngredientForModal: PropTypes.func.isRequired
}
