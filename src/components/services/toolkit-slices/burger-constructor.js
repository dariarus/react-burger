import {createSlice} from '@reduxjs/toolkit';

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    ingredients: []
  },
  reducers: {
    addIngredientToOrder: (state, action) => {
      const uniqId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
      console.log(uniqId())

      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        }
      } else {
        const copiedSelectedItemsIdIngredients = [
          ...state.ingredients
        ];
        copiedSelectedItemsIdIngredients.push({
          item: action.payload,
          uniqueId: uniqId()
        })
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
      const index = copiedIngredientArray.findIndex(itemWithId => itemWithId.uniqueId === action.payload) //id
      if (index > -1) {
        copiedIngredientArray.splice(index, 1)
      } else {
        console.log(`Error: Can not find itemWithId: ${action.payload}`)
      }

      return {
        ...state,
        ingredients: copiedIngredientArray
      }
    }
  }
})
export const {addIngredientToOrder, deleteIngredientFromOrder} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
