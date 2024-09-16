import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import carSlice from "./slices/car/carSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carSlice,
  },
});

export type StoreT = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
