import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from "../../src/redux/slices/authSlice"
import productsReducer from "../../src/redux/slices/productSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  }
});
