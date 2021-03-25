import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

//   optional Start
  // export type AppDispatch = typeof store.dispatch;
  // export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

//   optional end

export default store;
