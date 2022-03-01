import React from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {IUserDataSliceState} from "./index";

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

/*** input default placeholder ***/
 //export type TInputDefault = TInputInterface;
 export type TInputDefault = {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  name?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: keyof TICons;
  errorText?: string;
  size?: 'default' | 'small';
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
};

 export type TPropsAccount = {
   text: string,
   children?: React.ReactNode
 }

 /*** refresh token state ***/
export type TToken = Omit<IUserDataSliceState, "user">

/*** refresh user data state ***/
export type TUserRefresh = Omit<IUserDataSliceState, "accessToken" & "refreshToken">
