import React, {FunctionComponent} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import ingredientsWrapper from "../../burger-ingredients/burger-ingredients.module.css";

import {BurgerIngredients} from "../../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../burger-constructor/burger-constructor";
import {Modal} from "../../modal/modal";
import {IngredientDetails} from "../../ingredient-details/ingredient-details";
import {OrderDetails} from "../../order-details/order-details";

import {useAppDispatch, useSelector} from "../../../services/types/hooks";
import {handleModalSlice} from "../../../services/toolkit-slices/modal";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {IngredientDetailsPage} from "../ingredient-details-page/ingredient-details-page";

export const BurgerConstructorPage: FunctionComponent = () => {
  const {burgerDataState, modalState} = useSelector(state => {
    return state
  });

  const {path} = useRouteMatch();

  const history = useHistory();
  const redirectToIngredientPage = React.useCallback(() => {
    history.push({pathname: `${path}`});
  }, [history])

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
          modalState.modalsOpened.modalIngredientDetailsOpened
            && <Route
              path={`/ingredient/:id`}
              render={() => {
                return (
                  <Modal handleOnClose={() => {
                    dispatch(actionsModal.handleModalClose());
                    redirectToIngredientPage();
                  }}>
                    <IngredientDetails/>
                  </Modal>
                )
              }}
            />
        }

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
