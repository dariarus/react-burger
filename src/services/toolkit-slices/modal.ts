import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IModalSliceState} from "../types/index";
import {TIngredient, TOrders} from "../types/data";
import {IModalActions} from "../types/action-type";

export const handleModalSlice = createSlice({
  name: 'modalState',
  initialState: {
    modalsOpened: {},
    ingredientForModal: null,
  } as IModalSliceState,
  reducers: {
    setIngredientForModal: (state, action: PayloadAction<TIngredient | TOrders>) => {
      return {
        ...state,
        ingredientForModal: action.payload // ingredient
      }
    },
    handleModalOpen: (state, action: PayloadAction<{ [index: string]: boolean }>) => {
      return {
        ...state,
        modalsOpened: action.payload
      };
    },
    handleModalClose: (state) => {
      return {
        ...state,
        modalsOpened: {}
      };
    },
  }
})

export default handleModalSlice.reducer
export const {
  setIngredientForModal,
  handleModalOpen,
  handleModalClose
} = handleModalSlice.actions

export const modalActions: IModalActions = {
  setIngredientForModal: setIngredientForModal,
  handleModalOpen: handleModalOpen,
  handleModalClose: handleModalClose
}
