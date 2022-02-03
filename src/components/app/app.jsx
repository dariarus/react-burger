import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import main from './app.module.css';
import ingredientsWrapper from "../burger-ingredients/burger-ingredients.module.css";

import { getBurgerDataFromServer } from "../../services/actions/api";

import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import { handleModalSlice } from "../../services/toolkit-slices/modal";

function App() {

  const { burgerDataState, modalState } = useSelector(state => {
    return state
  });

  const dispatch = useDispatch();

  const actionsModal = handleModalSlice.actions;

  /*** API ***/
  React.useEffect(() => {
    // Отправляем экшен при монтировании компонента
    dispatch(getBurgerDataFromServer());
  }, [dispatch])

  /*** App Rendering ***/
  if (burgerDataState.hasError) {
    return <h2 className="text text_type_main-default">{burgerDataState.error.message}</h2>;
  } else if (burgerDataState.isLoading) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={main.main}>
        <AppHeader />
        <main className="pt-10 pb-10">
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <div className={ingredientsWrapper.section}>

            <DndProvider backend={HTML5Backend}>
              {
                burgerDataState &&
                <BurgerIngredients />
              }

              <BurgerConstructor />
            </DndProvider>

            {
              modalState.modalsOpened.modalIngredientDetailsOpened &&
              <Modal handleOnClose={() => {
                dispatch(actionsModal.handleModalClose());
              }}>
                <IngredientDetails />
              </Modal>
            }

            {
              modalState.modalsOpened.modalOrderDetailsOpened &&
              <Modal handleOnClose={() => {
                dispatch(actionsModal.handleModalClose());
              }}>
                <OrderDetails />
              </Modal>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
