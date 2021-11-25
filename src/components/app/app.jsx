import React from 'react';

import main from './app.module.css';
import ingredientsWrapper from "../burger-ingredients/burger-ingredients.module.css";

import {ingredientTypeRuName, queryBurgerDataUrl} from "../../utils/burger-data.js";

import {AppHeader} from '../app-header/app-header.jsx';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.jsx';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.jsx';
import {ModalOverlay} from "../modal-overlay/modal-overlay.jsx";
import {OrderDetails} from "../order-details/order-details.jsx";
import {IngredientDetails} from "../ingredient-details/ingredient-details.jsx";

function App() {

  const [state, setState] = React.useState({
    modalsOpened: {},
    selectedIngredientId: null,
    modalIsVisible: false,
    isLoading: false,
    hasError: false,
    error: '',
    burgerData: []
  });

  React.useEffect(() => {
    fetch(`${queryBurgerDataUrl}`)
      .then(res => res.json())
      .then(
        (res) => {
          setState(state => ({
            ...state,
            isLoading: true,
            burgerData: res.data
          }));
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setState(state => ({
            ...state,
            isLoading: true,
            hasError: true,
            error: error
          }))
        }
      )
  }, [])


  const setSelectedIngredientId = (ingredientId) => {
    setState((state) => (
      {
        ...state,
        selectedIngredientId: ingredientId
      }));
  }

  function handleOpenModal(modalToOpen) {
    setState(state => {
      const modalState = {
        ...state,
        modalIsVisible: true
      };
      if (modalToOpen) {
        Object.keys(modalState.modalsOpened).forEach(modal => {
          modalState.modalsOpened[modal] = false;
        })
        modalState.modalsOpened[modalToOpen] = true;
      }
      return modalState;
    })
  }

  function handleCloseModal(modalToClose) {
    setState(state => {
      const modalState = {
        ...state,
        modalIsVisible: false
      };
      if (modalToClose) {
        Object.keys(modalState.modalsOpened).forEach(modal => {
          modalState.modalsOpened[modal] = false;
        })
      }
      return modalState;
    })
    //console.log(state);
  }

  if (state.hasError) {
    return <div>Ошибка: {state.error.message}</div>;
  } else if (!state.isLoading) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={main.main}>
        <AppHeader/>
        <main className="pt-10 pb-10">
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <div className={ingredientsWrapper.section}>
            <BurgerIngredients burgerData={state.burgerData} ingredientTypeRuName={ingredientTypeRuName}
                               handleOnClick={() => {
                                 handleOpenModal("modalIngredientDetailsOpened")
                               }}
                               setSelectedIngredientId={setSelectedIngredientId} //подъем состояния до родительского компонента от дочернего в
              // виде функции, которая меняет состояние и которая вызывается в доч.комп.
            />


            <BurgerConstructor burgerData={state.burgerData}
                               handleOnClick={() => {
                                 handleOpenModal("modalOrderDetailsOpened")
                               }}/>
            {
              // modalOrderDetailsOpened и modalIngredientDetailsOpened - убраны из глобального state, т.к. запис-ся динамически через handleOpenModal в
              // отдельный объект modalsOpened и впосл-ие берутся из него:
              state.modalIsVisible && state.modalsOpened.modalOrderDetailsOpened &&
              <ModalOverlay handleOnClose={() => {
                handleCloseModal("modalOrderDetailsOpened")
              }}>
                <OrderDetails/>
              </ModalOverlay>
            }

            {
              state.modalIsVisible && state.modalsOpened.modalIngredientDetailsOpened &&
              <ModalOverlay handleOnClose={() => {
                handleCloseModal("modalIngredientDetailsOpened")
              }}>
                <IngredientDetails ingredientProperties={state.burgerData}
                                   selectedIngredientId={state.selectedIngredientId}/>
              </ModalOverlay>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
