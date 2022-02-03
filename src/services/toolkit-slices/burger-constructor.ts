import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TIngredient, TIngredientItem, TDraggableItem} from '../types/data';

const getInitialState = (): {bun: TIngredient | null; ingredients: ReadonlyArray<TIngredientItem>} => {
  return {
    bun: null,
    ingredients: []
  }
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: getInitialState(),
  reducers: {
    addIngredientToOrder: (state, action: PayloadAction<TIngredient>) => {
      const uniqId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

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
    deleteIngredientFromOrder: (state, action: PayloadAction<string>) => {
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
    setIngredientToDrag: (state, action: PayloadAction<TDraggableItem>) => {
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
