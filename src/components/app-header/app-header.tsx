import React, {FunctionComponent, useMemo} from "react";
import {NavLink, useHistory} from "react-router-dom";


import headerStyle from "./app-header.module.css";

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


export const AppHeader: FunctionComponent = () => {
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
          <NavLink to={{pathname: '/login'}}
                   className={`ml-2 text text_type_main-default ${headerStyle.link}`}
                   activeClassName={`ml-2 text text_type_main-default ${headerStyle.link} ${headerStyle.active}`}>
            <div className="mr-2">
              <BurgerIcon type={routePath === '/login' ? 'primary' : 'secondary'}/>
            </div>
            Конструктор
          </NavLink>
        </div>
        <a href="#" className={`mr-0 p-5 ${headerStyle.link} ${headerStyle['link-inactive']}`}>
          <ListIcon type="secondary"/>
          <p className="ml-2 text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </a>
        {/*</div>*/}
        <Logo/>
      </div>
      <div className={`p-5 ${headerStyle['flex-container']}`}>
        <NavLink to="/profile"
                 className={`ml-2 text text_type_main-default ${headerStyle.link}`}
                 activeClassName={`ml-2 text text_type_main-default ${headerStyle.link} ${headerStyle.active}`}>
          <div className="mr-2">
            <ProfileIcon type={routePath === "/profile" ? "primary" : "secondary"}/>
          </div>
          Личный кабинет
        </NavLink>
      </div>
    </header>
  )
}
