import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        role: 'pending',
        isSignedIn: false
    }, 
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setIsSignedIn: (state, action) => {
            state.isSignedIn = action.payload;
        },
    }
});

export const {setRole, setIsSignedIn} = authSlice.actions;

export default authSlice.reducer;