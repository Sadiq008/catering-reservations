import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./action/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
