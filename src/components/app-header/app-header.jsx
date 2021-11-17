import React from "react";

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


export function AppHeader() {
    return (
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="pt-4 pb-4">
            <div style={{display: 'flex'}}>
                <a href="#" style={{display: 'flex', color: '#f2f2f3', textDecoration: 'none'}} className="mr-2 pt-5 pr-5 pb-5 pl-0">
                    <BurgerIcon type="primary" />
                    <p className="ml-2 text text_type_main-default">
                        Конструктор
                    </p>
                </a>
                <a href="#" style={{display: 'flex', marginRight: '0', textDecoration: 'none'}} className="p-5">
                    <ListIcon type="secondary" />
                    <p className="ml-2 text text_type_main-default text_color_inactive">
                        Лента заказов
                    </p>
                </a>
            </div>
            <Logo />
            <a href="#" style={{display: 'flex', textDecoration: 'none'}} className="p-5">
                <ProfileIcon type="secondary" />
                <p className="ml-2 text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </a>
        </header>
    )
}