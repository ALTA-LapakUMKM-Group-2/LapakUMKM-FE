import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  isLoggedIn : boolean;
} 

const initialState : StateType = {
  isLoggedIn : false,
};

export const authLogin = createSlice({
  name: "state",
  initialState : initialState,
  reducers: {
    handleAuth : (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

const reducers = {
  state : authLogin.reducer,
};

export const { handleAuth } = authLogin.actions;
export default reducers;

