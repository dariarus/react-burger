import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  return {
    bun: null,
    ingredients: []
  }
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: getInitialState(),
  reducers: {
    addIngredientToOrder: (state, action) => {
      const uniqId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

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
    },
    setIngredientToDrag: (state, action) => {
      const updatedIngredients = [...state.ingredients]

      const dragItem = state.ingredients[action.payload.dragIndex]
      const hoverItem = state.ingredients[action.payload.hoverIndex]

      updatedIngredients[action.payload.dragIndex] = hoverItem
      updatedIngredients[action.payload.hoverIndex] = dragItem

      return {
        ...state,
        ingredients: updatedIngredients
      }
    },
    cleanOrder: () => {
      return getInitialState();
    }
  }
})
export const { addIngredientToOrder, deleteIngredientFromOrder } = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer
