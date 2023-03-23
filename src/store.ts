import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/form/FormSlice"
import itemReducer from "./features/item/ItemSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    item: itemReducer
  }
})
