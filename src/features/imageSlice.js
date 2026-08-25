import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "gallary",
  initialState: {
    image: "",
  },
  reducers: {
    firstImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { firstImage } = imageSlice.actions;

export default imageSlice.reducer;
