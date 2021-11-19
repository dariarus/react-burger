import React from 'react';

import ingredientsWrapper from "../burger-ingredients/burger-ingredients.module.css";

import {AppHeader} from '../app-header/app-header.jsx';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.jsx';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.jsx';

function App() {
  return (
    <div style={{maxWidth: '1240px', margin: 'auto'}}>
      <AppHeader/>
      <section className="pt-10 pb-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={ingredientsWrapper.section}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </div>
      </section>
    </div>
  );
}

export default App;
