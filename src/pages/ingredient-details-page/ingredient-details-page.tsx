import React, {FunctionComponent} from "react";

import ingredientDetailsPage from './ingredient-details-page.module.css';

import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";
import {getBurgerDataFromServer, getUser} from "../../services/actions/api";
import {getCookie} from "../../utils/burger-data";
import {useHistory} from "react-router-dom";

export const IngredientDetailsPage: FunctionComponent = () => {
const history = useHistory();
  //
  // React.useEffect(() => {
  //    history.replace({ state: {} })
  // }, [history])

  return (
    <div className={ingredientDetailsPage.wrapper}>
        <IngredientDetails/>
    </div>
  )
}
