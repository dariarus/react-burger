import React from "react";
import { useSelector } from "react-redux";

import ingredientsWrapper from './burger-ingredients.module.css';

import { IngredientGroup } from "../ingredient-group/ingredient-group.jsx";
import { ingredientTypeRuName } from "../../utils/burger-data.js";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerIngredients() {
  const { burgerDataState } = useSelector(state => {
    return state
  });

  const sauce = React.useRef(null);
  const bun = React.useRef(null);
  const filling = React.useRef(null);
  const [tab, setActiveTab] = React.useState('buns')

  function scroll(element) {
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const handleMouseScroll = React.useCallback((event) => {
    const mainTopPosition = event.target.getBoundingClientRect().top; 

    const getCurrentPosition = (ref) => {
      return ref.current.getBoundingClientRect();
    }
    const isVisibleArea = (rectangle) => {
      return (
        rectangle.top - mainTopPosition / 2 <= mainTopPosition
        && rectangle.bottom - mainTopPosition / 2 > mainTopPosition
      )
    }
    const saucePosition = getCurrentPosition(sauce);
    const fillingPosition = getCurrentPosition(filling);

    if (isVisibleArea(saucePosition)) {
      setActiveTab("sauces")
    } else if (isVisibleArea(fillingPosition)) {
      setActiveTab("filling")
    } else {
      setActiveTab("buns")
    }
  }, [])

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
          <div className={ingredientsWrapper.layout} onScroll={(event) => {
            handleMouseScroll(event)
          }}>
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
