import React from 'react';

import main from './app.module.css';
import ingredientsWrapper from "../burger-ingredients/burger-ingredients.module.css";

import {burgerData, ingredientTypeRuName} from "../../utils/burger-data.js";

import {AppHeader} from '../app-header/app-header.jsx';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.jsx';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.jsx';

function App() {
  return (
    <div className={main.main}>
      <AppHeader />
      <main className="pt-10 pb-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={ingredientsWrapper.section}>
          <BurgerIngredients burgerData={burgerData} ingredientTypeRuName={ingredientTypeRuName}/>
          <BurgerConstructor burgerData={burgerData} />
        </div>
      </main>
    </div>
  );
}

export default App;
