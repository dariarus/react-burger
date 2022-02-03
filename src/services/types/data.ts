import {ConstructorElementDraggable} from "../../components/constructor-element-draggable/constructor-element-draggable";
import React from "react";

/*** burger-constructor slice ***/
export type TIngredient = {
  _id: string,
  type: string,
  name: string,
  price: number,
  image: string,
  image_large: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number
};

export type TIngredientItem = {
  item: TIngredient,
  uniqueId: string
};

export type TDraggableItem = {
  dragIndex: number,
  hoverIndex: number
};

/*** ingredient-group props ***/
export type TIngredientGroup = {
  groupName: string,
  groupItems: ReadonlyArray<TIngredient>
};

/*** draggable element ***/
export type TDraggableElement = {
  key: string,
  itemWithId: TIngredientItem,
  index: number
}
