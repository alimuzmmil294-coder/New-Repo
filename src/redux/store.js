import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import imageReducer from "../features/imageSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gallary: imageReducer,
  },
});
