import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/";
const INITIAL_STATE = {
  auth: {},
  isLoading: false,
};

const authSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "auth",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    donetLoading: (state) => {
      state.isLoading = false;
    },
    addAuth: (state, action) => {
      const auth = action.payload;
      state.auth = auth;
      state.isLoading = false;
    },
  },
});
export const { startLoading, donetLoading, addAuth } = authSlice.actions;

export default authSlice.reducer;

export const addAuthAsync = (auth) => async (dispatch) => {
  try {
    dispatch(startLoading());
    dispatch(addAuth(auth));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};
