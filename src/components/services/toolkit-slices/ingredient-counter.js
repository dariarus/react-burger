import {createSlice} from '@reduxjs/toolkit';

export const ingredientCounterSlice = createSlice({
  name: 'ingredientCounter',
  initialState: {
    isVisible: false,
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
      return {
        ...state,
        counter: state.counter + 1
      }
    },
    counter_decrement: (state, action) => { //needed?
      if (state.counter !== 1) {
        return {
          ...state,
          counter: state.counter - 1
        }
      } else {
        return {
          ...state,
          isVisible: false
        }
      }
    },
    counter_hidden: (state, action) => {
      return {
        ...state,
        isVisible: false
      }
    }
  }
})
