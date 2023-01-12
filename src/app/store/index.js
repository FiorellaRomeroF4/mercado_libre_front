import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const reducer = combineReducers({});

export const store = configureStore({
  reducer,
});
