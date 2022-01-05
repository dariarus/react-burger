import {createSlice} from '@reduxjs/toolkit';

export const handleModalSlice = createSlice({
  name: 'modalState',
  initialState: {
    modalsOpened: {},
    ingredientForModal: null,
  },
  reducers: {
    setIngredientForModal: (state, action) => {
      return {
        ...state,
        ingredientForModal: action.payload // ingredient
      }
    },
    handleModalOpen: (state, action) => {
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
