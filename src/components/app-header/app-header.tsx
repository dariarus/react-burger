import React, {FunctionComponent, useMemo} from "react";
import {NavLink, useHistory, withRouter} from "react-router-dom";

import headerStyle from "./app-header.module.css";

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "../../services/types/hooks";


const AppHeader: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const history = useHistory();
  const routePath = useMemo(() => history.location.pathname, [history.location]);

  return (
    <header className={`pt-4 pb-4 ${headerStyle.header}`}>
      <div className={headerStyle['flex-wrapper']}>
        {/*<div className={headerStyle['flex-container']}>*/}
        {/*<a href="#" className={`mr-2 pt-5 pr-5 pb-5 pl-0 ${headerStyle.link}`}>*/}
        {/*  <BurgerIcon type="primary"/>*/}
        {/*  <p className="ml-2 text text_type_main-default">*/}
        {/*    Конструктор*/}
        {/*  </p>*/}
        {/*</a>*/}
        <div className={`p-5 ${headerStyle['flex-container']}`}>
          <NavLink to={{pathname: '/'}} exact={true}
                   className={`ml-2 text text_type_main-default ${headerStyle.link}`}
                   activeClassName={`ml-2 text text_type_main-default ${headerStyle.link} ${headerStyle.active}`}>
            <div className="mr-2">
              <BurgerIcon type={routePath === '/' ? 'primary' : 'secondary'}/>
            </div>
            Конструктор
          </NavLink>
        </div>
        <NavLink to={{pathname: '/404'}} exact={true}
                 className={`ml-2 text text_type_main-default ${headerStyle.link}`}
                 activeClassName={`ml-2 text text_type_main-default ${headerStyle.link} ${headerStyle.active}`}>
          <div className="mr-2">
            <ListIcon type={routePath === '/404' ? 'primary' : 'secondary'}/>
          </div>
          Лента заказов
        </NavLink>
        <Logo/>
      </div>
      <div className={`p-5 ${headerStyle['flex-container']}`}>
        <NavLink to={{pathname: '/profile'}}
                 className={`ml-2 text text_type_main-default ${headerStyle.link}`}
                 activeClassName={`ml-2 text text_type_main-default ${headerStyle.link} ${headerStyle.active}`}>
          <div className="mr-2">
            <ProfileIcon
              type={(routePath === "/profile") || (routePath === "/profile/logout") ? "primary" : "secondary"}/>
          </div>
          <div className={`${headerStyle['flex-nav-link']}`}>
            <p className="text">Личный кабинет</p>
            <p className="text text_type_digits-default">
              {
                userData.user.name === '' ? "Star guest" : `${userData.user.name}`
              }
            </p>
          </div>
        </NavLink>
      </div>
    </header>
  )
}

export default withRouter(AppHeader)
