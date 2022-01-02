import { createSlice } from '@reduxjs/toolkit';

export const setTabsSlice = createSlice({
    name: 'set-tabs',
    initialState: {
        currentTab: null
    },
    reducers: {
        setCurrentTab: (state, action) => {
            return {
                ...state,
                currentTab: action.payload
            }
        }
    }
})
export const { setCurrentTab } = setTabsSlice.actions
export default setTabsSlice.reducer