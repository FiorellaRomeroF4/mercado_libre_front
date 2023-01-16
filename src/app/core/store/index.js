import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import items from "./search";

const reducer = combineReducers({
  items,
});

export const store = configureStore({
  reducer,
});
