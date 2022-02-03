import React, {FunctionComponent} from "react";

import headerStyle from "./app-header.module.css";

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


export const AppHeader: FunctionComponent = () => {
  return (
    <header className={`pt-4 pb-4 ${headerStyle.header}`}>
      <div className={headerStyle['flex-wrapper']}>
        <div className={headerStyle['flex-container']}>
          <a href="#" className={`mr-2 pt-5 pr-5 pb-5 pl-0 ${headerStyle.link}`}>
            <BurgerIcon type="primary"/>
            <p className="ml-2 text text_type_main-default">
              Конструктор
            </p>
          </a>
          <a href="#" className={`mr-0 p-5 ${headerStyle.link} ${headerStyle['link-inactive']}`}>
            <ListIcon type="secondary"/>
            <p className="ml-2 text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </a>
        </div>
        <Logo/>
      </div>
      <a href="#" className={`p-5 ${headerStyle.link} ${headerStyle['link-inactive']}`}>
        <ProfileIcon type="secondary"/>
        <p className="ml-2 text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </a>
    </header>
  )
}
