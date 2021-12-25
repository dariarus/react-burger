import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import main from './app.module.css';
import ingredientsWrapper from "../burger-ingredients/burger-ingredients.module.css";

import {getBurgerDataFromServer} from "../../utils/api.js";

import {AppHeader} from '../app-header/app-header.jsx';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.jsx';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.jsx';
import {Modal} from "../modal/modal.jsx";
import {OrderDetails} from "../order-details/order-details.jsx";
import {IngredientDetails} from "../ingredient-details/ingredient-details.jsx";

function App() {

  const {burgerDataState, modalState} = useSelector(state => {
    return state
  });

  const dispatch = useDispatch();

  /*** API ***/
  React.useEffect(() => {
    // Отправляем экшен при монтировании компонента
    dispatch(getBurgerDataFromServer());
  }, [])

  /*** App Rendering ***/
  if (burgerDataState.hasError) {
    return <h2 className="text text_type_main-default">{burgerDataState.error.message}</h2>;
  } else if (burgerDataState.isLoading) {
    console.log(burgerDataState.isLoading)
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={main.main}>
        <AppHeader/>
        <main className="pt-10 pb-10">
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <div className={ingredientsWrapper.section}>
            {
              // console.log(state) &&
              burgerDataState &&
              <BurgerIngredients/>
            }

            <BurgerConstructor/>

            {
              modalState.modalsOpened.modalOrderDetailsOpened &&
              <Modal>
                <OrderDetails/>
              </Modal>
            }

            {
              modalState.modalsOpened.modalIngredientDetailsOpened &&
              <Modal>
                <IngredientDetails/>
              </Modal>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
