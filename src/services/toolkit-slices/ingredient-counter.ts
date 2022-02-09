import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TIngredient} from "../types/data";

const getInitialState = (): {selectedIngredients: ReadonlyArray<TIngredient>} => {
  return {
    selectedIngredients: []
  }
}

export const ingredientCounterSlice = createSlice({
  name: 'ingredientCounter',
  initialState: getInitialState(),
  reducers: {
    counterIncrement: (state, action: PayloadAction<TIngredient>) => {
      let copiedSelectedIngredients = [
        ...state.selectedIngredients
      ];
      if (action.payload.type === 'bun') {
        copiedSelectedIngredients = copiedSelectedIngredients.filter(ingredient => ingredient.type !== 'bun')
      }
      copiedSelectedIngredients.push(action.payload)
      return {
        ...state,
        selectedIngredients: copiedSelectedIngredients
      }
    },
    counterDecrement: (state, action: PayloadAction<string>) => {
      let copiedSelectedIngredients = [
        ...state.selectedIngredients
      ];
      const index = copiedSelectedIngredients.findIndex(item => item._id === action.payload) //id
      if (index > -1) {
        copiedSelectedIngredients.splice(index, 1)
      } else {
        console.log(`Error: Can not find itemWithId: ${action.payload}`)
      }
      return {
        ...state,
        selectedIngredients: copiedSelectedIngredients
      }
    },
    counterClean: () => {
      return getInitialState();
    }
  }
})
