import {createSlice} from '@reduxjs/toolkit';

export const ingredientCounterSlice = createSlice({
  name: 'ingredientCounter',
  initialState: {
    isVisible: false,
    selectedIngredients: [],
    counter: 1
  },
  reducers: {
    counter_isVisible: (state, action) => {
      return {
        ...state,
        isVisible: true,
      }
    },
    counter_increment: (state, action) => {
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
    counter_decrement: (state, action) => { //needed?
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
    }
  }
})
