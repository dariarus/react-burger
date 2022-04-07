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

/*** Protected-route props type ***/
export type TProtectedRouteProps = {
  path: string,
  exact?: boolean,
  children?: React.ReactNode
}

/*** useLocation hook: location state ***/
export type TLocationState = {
  from?: {
    pathname: string;
  };
  background?: {
    state: any;
    pathname: string;
    search: string;
    hash: string;
    key: string;
  }
}

/*** orders feed ***/
export type TOrders = {
  ingredients: ReadonlyArray<string>,
  _id: string,
  name: string,
  status: string,
  number: number | null,
  createdAt: string,
  updatedAt: string
}

/*** ingredient icon props type ***/
export type TIngredientIcon = {
  image: string,
  imageName: string,
  isSixth?: boolean,
  index?: number,
  restCount?: number,
  ingredientCount?: number,
  children?: React.ReactNode
}

/*** counter for reducer ***/
export type TReducedCounter = {
  [index: string]: number
}

/*** order composition props type ***/
export type TOrderComposition = {ingredientCount: number} & Pick<TIngredient, "type" | "name" | "price" | "image">

