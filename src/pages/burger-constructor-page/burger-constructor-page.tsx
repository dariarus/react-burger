import React, {FunctionComponent} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import ingredientsWrapper from "../../components/burger-ingredients/burger-ingredients.module.css";

import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";
import {Modal} from "../../components/modal/modal";
import {OrderDetails} from "../../components/order-details/order-details";

import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {handleModalSlice} from "../../services/toolkit-slices/modal";

export const BurgerConstructorPage: FunctionComponent = () => {
  const {burgerDataState, modalState} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();
  const actionsModal = handleModalSlice.actions;

  return (
    <>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={ingredientsWrapper.section}>

        <DndProvider backend={HTML5Backend}>
          {
            burgerDataState &&
            <BurgerIngredients/>
          }

          <BurgerConstructor/>
        </DndProvider>

        {
          modalState.modalsOpened.modalOrderDetailsOpened &&
          <Modal handleOnClose={() => {
            dispatch(actionsModal.handleModalClose());
          }}>
            <OrderDetails/>
          </Modal>
        }
      </div>
    </>
  )
}
