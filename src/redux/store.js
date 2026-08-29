import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "../features/RecordSlice.js";
export const store = configureStore({
  reducer: {
    EmployeeRecord: recordSlice,
  },
});
