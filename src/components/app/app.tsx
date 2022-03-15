import React, {FunctionComponent} from 'react';
import {Switch, Route, useLocation, useHistory} from "react-router-dom";

import {ProtectedRoute} from "../protected-route/protected-route";

import {IngredientDetailsPage} from "../../pages/ingredient-details-page/ingredient-details-page";

import {useAppDispatch, useSelector} from "../../services/types/hooks";

import main from './app.module.css';

import {
  getBurgerDataFromServer,
  getUser
} from "../../services/actions/api";

import AppHeader from "../app-header/app-header";

import {BurgerConstructorPage} from "../../pages/burger-constructor-page/burger-constructor-page";
import {AuthorisationPage} from "../../pages/authorisation-page/authorisation-page";
import {RegistrationPage} from "../../pages/register-page/register-page";
import {ForgotPasswordPage} from "../../pages/forgor-password-page/forgor-password-page";
import {ResetPasswordPage} from "../../pages/reset-password-page/reset-password-page";
import {AccountPage} from "../../pages/profile-page/profile-page";
import {ProfileDetails} from "../profile-details/profile-details";
import {deleteCookie, getCookie} from "../../utils/burger-data";
import {LogoutPage} from "../../pages/logout-page/logout-page";
import {NotFound404} from "../../pages/not-found-404/not-found-404";
import {TLocationState} from "../../services/types/data";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";

const App: FunctionComponent = () => {
  const {burgerDataState} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();
  const history = useHistory();

  let location = useLocation<TLocationState>();
  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  /*** API ***/
  React.useEffect(() => {
    // Отправляем экшены при монтировании компонента
    dispatch(getBurgerDataFromServer());
    dispatch(getUser(getCookie('accessToken'), 3));
    if (background) {
      delete location.state.background;
    }
   // history.replace({state: {}})
  }, [dispatch, history])

  /*** App Rendering ***/
  if (burgerDataState.hasError) {
    return <h2 className="text text_type_main-default">{burgerDataState.error.message}</h2>;
  } else if (burgerDataState.isLoading) {
    return <div>Загрузка...</div>;
  } else {
    return (
      // <BrowserRouter>
      <div className={main.main}>
        <AppHeader/>
        <main className="pt-10 pb-10">
          <Switch location={background || location}>

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

            <Route path="/ingredient/:id">
              <IngredientDetailsPage/>
            </Route>

            <Route path="/404" exact={true}>
              <NotFound404/>
            </Route>

            <Route path="/">
              <BurgerConstructorPage/>
            </Route>

          </Switch>
          {/*Show the modal when a background page is set */}
          {
            background
            && <Route exact path="/ingredient/:id" children={<Modal handleOnClose={() => {
              history.goBack();
            }}>
              <IngredientDetails/>
            </Modal>
            }/>
          }
        </main>
      </div>
      // </BrowserRouter>
    );
  }
}

export default App;
