import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  angle: 0,
};

const turtleSlice = createSlice({
  name: "turtle",
  initialState,
  reducers: {
    setAngle: (state, action) => {
      state.angle = action.payload.angle;
    },

    resetAngle: (state) => {
      state.angle = 0;
    },
  },
});

export const { setAngle, resetAngle } = turtleSlice.actions;

export default turtleSlice.reducer;
