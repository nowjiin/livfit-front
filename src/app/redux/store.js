import { combineReducers, configureStore } from "@reduxjs/toolkit";

import playReducer from "./slices/playSlice";
import turtleReducer from "./slices/turtleSlice";

const rootReducer = combineReducers({
  play: playReducer,
  turtle: turtleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
