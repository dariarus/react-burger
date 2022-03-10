import React, {FunctionComponent, useMemo} from "react";
import {Route, Redirect, useHistory} from "react-router-dom";

import {useSelector} from "../../services/types/hooks";
import {TProtectedRouteProps} from "../../services/types/data";

export const ProtectedRoute: FunctionComponent<TProtectedRouteProps> = ({children, ...rest}) => {
  const {userData} = useSelector(state => {
    return state
  });

  const history = useHistory();
  const path = useMemo(() => history.location.pathname, [history.location]);

  // if (!userData.isUserLoading) {
  //   return null;
  // } else {
  return (
    <Route
      {...rest} // это пропсы path и exact
      render={({location}) =>  // render - пропс компонента Route. Исп-ся как функция, в св.с чем  избег-ся лишни рендеринг. Вызыв-ся при совпадении URL
        (userData.user.name !== '' && userData.user.email !== '')
          ? (children)
          : ((userData.user.name !== '' && userData.user.email !== '') && (path === '/profile'))
            ? (children)
            && (<Redirect to={{
              pathname: '/forgot-password'
            }}/>)
            : (
              <Redirect // Если пользователя нет в хранилище, происходит переадресация на роут /login
                // Передадим в пропс to не строку, а объект.
                to={{
                  // Маршрут, на который произойдёт переадресация
                  pathname: '/login',
                  // В from сохраним текущий маршрут
                  state: {from: location}
                }} // все это после авторизации даст переадресацию на страницу, которую изначально открыл польз-ль, не будучи автор-ым
              />)
      }
    />
  );
}
