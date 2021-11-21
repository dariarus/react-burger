import React from "react";
import PropTypes from 'prop-types';

import ingredientsWrapper from './burger-ingredients.module.css';

import {IngredientGroup} from "../ingredient-group/ingredient-group.jsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerIngredients(props) {
  const sauce = React.useRef(null);
  const bun = React.useRef(null);
  const filling = React.useRef(null);
  const [tab, setActiveTab] = React.useState('one')

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
            <IngredientGroup groupName={props.ingredientTypeRuName.bun}
                             groupItems={
                               props.burgerData.filter(burgerItem => burgerItem.type === 'bun')
                             }
                             ref={bun}
            />
            <IngredientGroup groupName={props.ingredientTypeRuName.sauce}
                             groupItems={
                               props.burgerData.filter(burgerItem => burgerItem.type === 'sauce')
                             }
                             ref={sauce}
            />
            <IngredientGroup groupName={props.ingredientTypeRuName.main}
                             groupItems={
                               props.burgerData.filter(burgerItem => burgerItem.type === 'main')
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
  ingredientTypeRuName: PropTypes.shape({
    bun: PropTypes.string.isRequired,
    sauce: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
  burgerData: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired
}
