import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from './sidebarSlice'
import authSlice from './authSlice'

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        auth: authSlice,
    },
});

export default store;