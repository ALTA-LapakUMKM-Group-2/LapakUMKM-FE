import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducer/reducer";

const store = configureStore ({
  reducer :{
    data: reducers.state,
  },
});

export default store;