import React, {FunctionComponent} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import {ProtectedRoute} from "../protected-route/protected-route";

import {IngredientDetailsPage} from "../pages/ingredient-details-page/ingredient-details-page";

import {useAppDispatch, useSelector} from "../../services/types/hooks";

import main from './app.module.css';

import {
  getBurgerDataFromServer,
  getUser
} from "../../services/actions/api";

import AppHeader from "../app-header/app-header";

import {BurgerConstructorPage} from "../pages/burger-constructor-page/burger-constructor-page";
import {AuthorisationPage} from "../pages/authorisation-page/authorisation-page";
import {RegistrationPage} from "../pages/register-page/register-page";
import {ForgotPasswordPage} from "../pages/forgor-password-page/forgor-password-page";
import {ResetPasswordPage} from "../pages/reset-password-page/reset-password-page";
import {AccountPage} from "../pages/profile-page/profile-page";
import {ProfileDetails} from "../profile-details/profile-details";
import {getCookie} from "../../utils/burger-data";
import {LogoutPage} from "../pages/logout-page/logout-page";
import {NotFound404} from "../pages/not-found-404/not-found-404";


const App: FunctionComponent = () => {
  const {burgerDataState, modalState} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();

  /*** API ***/
  React.useEffect(() => {
    // Отправляем экшены при монтировании компонента
    dispatch(getBurgerDataFromServer());
    getUser(dispatch, getCookie('accessToken'), 3)
  }, [dispatch])

  /*** App Rendering ***/
  if (burgerDataState.hasError) {
    return <h2 className="text text_type_main-default">{burgerDataState.error.message}</h2>;
  } else if (burgerDataState.isLoading) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <BrowserRouter>
        <div className={main.main}>
          <AppHeader/>
          <main className="pt-10 pb-10">
            <Switch>

              <Route path="/login" exact={true}>
                <AuthorisationPage/>
              </Route>

              <Route path="/register" exact={true}>
                <RegistrationPage/>
              </Route>

              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage/>
              </Route>

              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage/>
              </Route>

              <ProtectedRoute path="/profile" exact={true}>
                <AccountPage text="В этом разделе вы можете изменить свои персональные данные">
                  <ProfileDetails/>
                </AccountPage>
              </ProtectedRoute>

              <ProtectedRoute path="/profile/logout" exact={true}>
                <AccountPage text="В этом разделе вы можете выйти из системы">
                  <LogoutPage/>
                </AccountPage>
              </ProtectedRoute>

              {
                !modalState.modalsOpened.modalIngredientDetailsOpened
                  && <Route path={`/ingredient/:id`}>
                    <IngredientDetailsPage/>
                  </Route>
              }

              <Route path="/404" exact={true}>
                <NotFound404 />
              </Route>

              <Route path="/">
                <BurgerConstructorPage/>
              </Route>

            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
