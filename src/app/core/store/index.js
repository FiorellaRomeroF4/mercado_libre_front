import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import search from "./search";

const reducer = combineReducers({
  search,
});

export const store = configureStore({
  reducer,
});
