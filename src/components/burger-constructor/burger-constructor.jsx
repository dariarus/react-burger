import React from 'react';

import burgerConstructor from "./burger-constructor.module.css";
import creditIcon from "../../images/credit-icon 36x36.svg";

import {burgerData} from "../../utils/burger-data";

import {ConstructorElement, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor() {
  return (
    <div className={burgerConstructor.container}>

      <div className={burgerConstructor.top}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>

      <div className={burgerConstructor.constructor}>
        {burgerData.filter(burgerItem => (burgerItem.type !== 'bun')).map(item => (
          <div className={burgerConstructor.wrapper}>
            <div className="mr-1">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>

      <div className={burgerConstructor.bottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>


      <div className={burgerConstructor.order}>
        <h2 className="text text_type_digits-medium mr-2">00000</h2>
        <img src={creditIcon} alt="иконка кредита большая" className="mr-10"/>
        <Button type="primary" size="large" className="ml-10">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
