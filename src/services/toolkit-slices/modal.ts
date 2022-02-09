import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IModalSliceState} from "../types/index";
import {TIngredient} from "../types/data";

export const handleModalSlice = createSlice({
  name: 'modalState',
  initialState: {
    modalsOpened: {},
    ingredientForModal: null,
  } as IModalSliceState,
  reducers: {
    setIngredientForModal: (state, action: PayloadAction<TIngredient>) => {
      return {
        ...state,
        ingredientForModal: action.payload // ingredient
      }
    },
    handleModalOpen: (state, action: PayloadAction<object>) => {
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
export const {setIngredientForModal, handleModalOpen, handleModalClose} = handleModalSlice.actions
export default handleModalSlice.reducer
