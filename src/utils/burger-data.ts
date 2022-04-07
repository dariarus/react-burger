import {TIngredient, TIngredientItem, TReducedCounter} from "../services/types/data";
import React from "react";

enum ingredientTypeRuName {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинка"
}

const queryBurgerDataUrl = 'https://norma.nomoreparties.space/api';
const queryFeedDataUrl = 'wss://norma.nomoreparties.space';

function mapBurgerIngredientFromId(arrayOfIngredientsIds: ReadonlyArray<string>, arrayOfIngredients: ReadonlyArray<TIngredient>) {
  return arrayOfIngredientsIds.map((orderIngredient) => arrayOfIngredients.find(ingredient => ingredient._id === orderIngredient));
}

function cutDuplicatesFromArray(arrayWithDuplicates: Array<TIngredient | undefined>) {
  // вырезаем из массива дубликаты ингредиентов
  return arrayWithDuplicates.filter((ingredient, index, array) => array.indexOf(ingredient) === index);
}

function replaceBunToStart(array: Array<TIngredient | undefined>) {
  let arrayBunSorted = array;
  const indexOfBun = array.findIndex(ingredient => ingredient && ingredient.type === 'bun');
  if (indexOfBun !== 0) {
    arrayBunSorted = array.splice(indexOfBun, 1);
    return arrayBunSorted.concat(array);
  } else return arrayBunSorted;
}

function countNotUniqueIngredients(array: ReadonlyArray<string>) {
  return array.reduce(function (counter: TReducedCounter, idValue: string) {
    counter[idValue] ? counter[idValue]++ : counter[idValue] = 1;
    return counter;
  }, {});
}

const calculateTotalPrice = (bun: TIngredient | undefined | null, ingredients: Array<TIngredient | undefined>) => {
  const ingredientArrayReducer = (acc: number, item: TIngredient | undefined | null) => {
    if (!item) return acc;
    return acc + item.price
  }
  let bunPrice = 0;
  let ingredientPrice = 0;
  if (bun) {
    bunPrice = bun.price * 2;
  }
  if (ingredients !== undefined) {
    ingredientPrice = ingredients
      //.map(element => element && element.item ? element.item : element)
      .reduce(ingredientArrayReducer, 0);
    return ingredientPrice + bunPrice;
  } else return null
}

const mapBunAndIngredientsFromArray = (array: ReadonlyArray<TIngredient | undefined>) => {
  let objectOfBunConcatIngredientArray: { bun: TIngredient | null | undefined, ingredients: Array<TIngredient | undefined> } = {
    bun: undefined,
    ingredients: []
  };
  objectOfBunConcatIngredientArray.bun = array.find(bun => bun && bun.type === "bun" && bun) || null;
  objectOfBunConcatIngredientArray.ingredients = array
    .filter(ingredient => ingredient && (ingredient.type === "main" || ingredient.type === "sauce") && ingredient);
  return objectOfBunConcatIngredientArray;
}

const defineActualOrderDateInformation = (dateString: string): string => {
  const orderDateTime = new Date(dateString);
  // [const day = orderDateTime.toLocaleDateString('ru-RU', {month: 'long', day: 'numeric'}) // '3 апреля']

  /*** reset hours after getting new Date objects ***/
  const orderDate = new Date(dateString);
  const orderDateMidnight = orderDate.setHours(0, 0, 0, 0);
  const nowDate = new Date();
  const nowDateMidnight = nowDate.setHours(0, 0, 0, 0);

  const dayMs = 86400000 // = 1000мс * 60сек * 60мин * 24ч

  const differenceInDays = (orderDateMidnight - nowDateMidnight) / dayMs;
  let actualCompletionTime;
  if (differenceInDays < -3) {
    actualCompletionTime = orderDate.toLocaleDateString('ru-RU');
  } else {
    actualCompletionTime = new Intl.RelativeTimeFormat('ru', {numeric: "auto"})
      .format(differenceInDays, 'day');
  }
  const actualDateInformationStr = `${actualCompletionTime}, ${orderDateTime.getHours() >= 10
    ? orderDateTime.getHours()
    : "0" + orderDateTime.getHours()}:${orderDateTime.getMinutes() >= 10
    ? orderDateTime.getMinutes()
    : "0" + orderDateTime.getMinutes()} i-GMT${orderDateTime.getTimezoneOffset() <= 0
    ? "+" + orderDateTime.getTimezoneOffset() / -60
    : "-" + orderDateTime.getTimezoneOffset() / -60}`;
  return actualDateInformationStr.charAt(0).toUpperCase() + actualDateInformationStr.slice(1);
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

function deleteCookie(cookieName: string) {
  // Находим куку по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(cookieName, null, {expires: -1});
}

export {
  ingredientTypeRuName,
  queryBurgerDataUrl,
  queryFeedDataUrl,
  mapBurgerIngredientFromId,
  replaceBunToStart,
  countNotUniqueIngredients,
  cutDuplicatesFromArray,
  calculateTotalPrice,
  mapBunAndIngredientsFromArray,
  defineActualOrderDateInformation,
  setCookie,
  getCookie,
  deleteCookie
};
