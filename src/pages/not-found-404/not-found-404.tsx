import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

import trollShibaInu from '../../images/404_shiba_inu.png';
import notFound from './not-found-404.module.css';

export const NotFound404: FunctionComponent = () => {
  return (
    <div className={notFound.wrapper}>
      <img className={notFound.image} src={trollShibaInu} alt="Собака не понимает, где страница"/>
      <h1 className={`text text_type_main-large ${notFound.text}`}>Святые булочки, <br/> страница не существует!!!</h1>
      <Link to='/' className={notFound.link}>Перейти в Конструктор бургеров</Link>
    </div>
  )
}
