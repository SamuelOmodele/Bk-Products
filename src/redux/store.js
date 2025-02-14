import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from './sidebarSlice'
import authSlice from './authSlice'
import searchSlice from './searchSlice'

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        auth: authSlice,
        search: searchSlice,
    },
});

export default store;