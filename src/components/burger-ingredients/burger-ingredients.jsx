import React from "react";
import PropTypes from 'prop-types';

import ingredientsWrapper from './burger-ingredients.module.css';


import {IngredientGroup} from "../ingredient-group/ingredient-group.jsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
//import {ingredientProperties} from "../../utils/burger-data";
import {BurgerContext} from "../services/burger-context";

export function BurgerIngredients(props) {
  const {state} = React.useContext(BurgerContext);

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
            <IngredientGroup groupName={props.ingredientTypeRuName.bun}
                             groupItems={
                               state.burgerData.filter(burgerItem => burgerItem.type === 'bun')
                             }
                             handleOnClick={props.handleOnClick}
                             setIngredientIdForModal={props.setIngredientIdForModal}
                             ref={bun}
            />
            <IngredientGroup groupName={props.ingredientTypeRuName.sauce}
                             groupItems={
                               state.burgerData.filter(burgerItem => burgerItem.type === 'sauce')
                             }
                             handleOnClick={props.handleOnClick}
                             setIngredientIdForModal={props.setIngredientIdForModal}
                             ref={sauce}
            />
            <IngredientGroup groupName={props.ingredientTypeRuName.main}
                             groupItems={
                               state.burgerData.filter(burgerItem => burgerItem.type === 'main')
                             }
                             handleOnClick={props.handleOnClick}
                             setIngredientIdForModal={props.setIngredientIdForModal}
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
 //burgerData: ingredientProperties,
  handleOnClick: PropTypes.func.isRequired,
  setIngredientIdForModal: PropTypes.func.isRequired
}
