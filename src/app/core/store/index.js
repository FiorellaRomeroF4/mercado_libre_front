import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import items from "./search";

const reducer = combineReducers({
  items,
});

const store = configureStore({
  reducer,
});

export default store;
