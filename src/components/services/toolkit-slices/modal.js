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
    handleModal_open: (state, action) => {
      return {
        ...state,
        modalsOpened: action.payload
      };
    },
    handleModal_close: (state) => {
      return {
        ...state,
        modalsOpened: {}
      };
    },
  }
})
export const {setIngredientForModal, handleModal_open, handleModal_close} = handleModalSlice.actions
export default handleModalSlice.reducer

// const setIngredientForModal = (ingredient) => {
//   setState((state) => (
//     {
//       ...state,
//       ingredientForModal: ingredient
//     }));
// }

// function handleOpenModal(modalToOpen) {
//   setState(state => {
//     const modalState = {
//       ...state
//     };
//     if (modalToOpen) {
//       Object.keys(modalState.modalsOpened).forEach(modal => {
//         modalState.modalsOpened[modal] = false;
//       })
//       modalState.modalsOpened[modalToOpen] = true;
//     }
//     return modalState;
//   })
// }

// function handleCloseModal(modalToClose) {
//   setState(state => {
//     const modalState = {
//       ...state
//     };
//     if (modalToClose) {
//       Object.keys(modalState.modalsOpened).forEach(modal => {
//         modalState.modalsOpened[modal] = false;
//       })
//     }
//     return modalState;
//   })
//   //console.log(state);
// }
