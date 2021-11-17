import React from "react";

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

export const Tabulation = () => {
  const [current, setCurrent] = React.useState('buns')
  return (
    <div style={{display: 'flex'}} className="mt-5">
      <a href="#bun" style={{textDecoration: "none"}}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href="#sauce" style={{textDecoration: "none"}}>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#main" style={{textDecoration: "none"}}>
        <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  )
}
