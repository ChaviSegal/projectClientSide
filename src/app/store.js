import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../features/order/basketSlice";
import userSlice from "../features/user/userSlice";
// import basketReducer from "../features/order/basketSlice";
// import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    user: userSlice
  }
});
