import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar', 
    initialState: {
        activeSidebarMenu: 'overview'
    }, 
    reducers: {
        setActiveSidebarMenu: (state, action) => {
            state.activeSidebarMenu = action.payload;
        }
    }
});

export const {setActiveSidebarMenu} = sidebarSlice.actions;

export default sidebarSlice.reducer;