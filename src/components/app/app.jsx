import React from 'react';

import ingredientsWrapper from "../render-ingredients-grid/render-Ingredients-grid.module.css";

import {AppHeader} from '../app-header/app-header.jsx';
import {BurgerIngredients} from '../render-ingredients-grid/render-ingredients-grid.jsx';

function App() {
  return (
    <div style={{maxWidth: '1240px', margin: 'auto'}}>
      <AppHeader/>
      <section className="pt-10">
        <h1 className="text text_type_main-large ">Соберите бургер</h1>
        <div className={ingredientsWrapper.section}>
          <BurgerIngredients/>
        </div>
      </section>
    </div>
  );
}

export default App;
