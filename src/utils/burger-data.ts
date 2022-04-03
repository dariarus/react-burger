import {TIngredient, TIngredientItem} from "../services/types/data";
import React from "react";

enum ingredientTypeRuName {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинка"
}

const queryBurgerDataUrl = 'https://norma.nomoreparties.space/api';
const queryFeedDataUrl = 'wss://norma.nomoreparties.space';

export const calculateTotalPrice = (bun: TIngredient | null, ingredients: ReadonlyArray<TIngredient>) => {
  const ingredientArrayReducer = (acc: number, item: TIngredient) => {
    return acc + item.price
  }
  let bunPrice = 0;
  if (bun) {
    bunPrice = bun.price * 2;
  }
    if (ingredients) {
      let ingredientPrice = ingredients
        //.map(element => element && element.item ? element.item : element)
        .reduce(ingredientArrayReducer, 0);
      return ingredientPrice + bunPrice;
    } else return bunPrice
}

function setCookie(cookieName: string, tokenValue: string | number | boolean | null, props: any = {}) {
  props = {
    path: '/',
    ...props
  }
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (tokenValue !== null) {
    tokenValue = encodeURIComponent(tokenValue);
  }
  let updatedCookie = cookieName + '=' + tokenValue;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(cookieName: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(cookieName: string) {
  // Находим куку по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(cookieName, null, { expires: -1 });
}

export {ingredientTypeRuName, queryBurgerDataUrl, queryFeedDataUrl, setCookie, getCookie};
