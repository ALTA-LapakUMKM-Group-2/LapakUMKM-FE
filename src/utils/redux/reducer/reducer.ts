import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  isLoggedIn : boolean;
  isTheme : boolean;
} 

const initialState : StateType = {
  isLoggedIn : false,
  isTheme : false,
};

export const authLogin = createSlice({
  name: "state",
  initialState : initialState,
  reducers: {
    handleAuth : (state, action) => {
      state.isLoggedIn = action.payload;
    },
    getDark : (state,action) => {
      state.isTheme = action.payload;
    },
    // getLight : (state) => {
    //   state.isTheme = false;
    // },
  },
});

const reducers = {
  state : authLogin.reducer,
};

export const { handleAuth, getDark } = authLogin.actions;
export default reducers;

