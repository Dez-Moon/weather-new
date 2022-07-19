import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
  app: appReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

declare global {
  interface Window {
    store: any;
  }
}
window.store = store;
