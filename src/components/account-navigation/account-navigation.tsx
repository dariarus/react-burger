import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";

import navigation from './account-navigation.module.css';
import {TPropsAccount} from "../../services/types/data";

export const AccountNavigation: FunctionComponent<TPropsAccount> = (props) => {
  return (
    <nav className={navigation.wrapper}>
      <NavLink to="/profile" exact={true} className={`text text_type_main-medium text_color_inactive ${navigation.link}`}
               activeClassName={`text text_type_main-medium text_color_inactive ${navigation.link} ${navigation.active}`}>Профиль</NavLink>
      <NavLink to="/profile/orders" className={`text text_type_main-medium text_color_inactive ${navigation.link}`}
               activeClassName={`text text_type_main-medium text_color_inactive ${navigation.link} ${navigation.active}`}>История
        заказов</NavLink>
      <NavLink to="/profile/logout" exact={true} className={`text text_type_main-medium text_color_inactive ${navigation.link}`}
               activeClassName={`text text_type_main-medium text_color_inactive ${navigation.link} ${navigation.active}`}>Выход</NavLink>
      <p className={`text text_type_main-small text_color_inactive ${navigation.text}`}>{props.text}</p>
    </nav>
  )
}
