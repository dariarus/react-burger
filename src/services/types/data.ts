import React from "react";

export type TErrorState = {
  message?: string
};

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

/*** constructor draggable element ***/
export type TDraggableIngredient = {
  ingredient: TIngredient,
  image: string,
  name: string,
  price: number
}

/*** modal ***/
export type TModal = {
  handleOnClose: () => void,
  children: React.ReactNode
}

/*** modal overlay ***/
export type TModalOverlay = Omit<TModal, "children">
