import {createSlice} from '@reduxjs/toolkit';

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    ingredients: []
  },
  reducers: {
    addIngredientToOrder: (state, action) => {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        }
      } else {
        const copiedSelectedItemsIdIngredients = [
          ...state.ingredients
        ];
        copiedSelectedItemsIdIngredients.push(action.payload);
        return {
          ...state,
          ingredients: copiedSelectedItemsIdIngredients
        }
      }
    },
    deleteIngredientFromOrder: (state, action) => {
      const copiedIngredientArray = [
        ...state.ingredients
      ];
      copiedIngredientArray.splice(action.payload, 1) //index
      return {
        ...state,
        ingredients: copiedIngredientArray
      }
    }
  }
})
export const {addIngredientToOrder, deleteIngredientFromOrder} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
