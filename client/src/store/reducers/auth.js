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
    clearAuth: (state) => {
      state.auth = null;
      state.isLoading = false;
    },
  },
});
export const {
  startLoading,
  donetLoading,
  addAuth,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;

export const addAuthAsync = (auth) => async (dispatch) => {
  try {
    dispatch(startLoading());
    dispatch(addAuth(auth));
    localStorage.setItem("profile", JSON.stringify({ ...auth }));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const clearAuthAsync = () => (dispatch) => {
  try {
    dispatch(startLoading());
    dispatch(clearAuth());
    localStorage.clear();
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const signInAsync = (formData, cb) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.signIn(formData);
    dispatch(addAuth(data));
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    cb();
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const signUpAsync = (formData, cb) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.signUp(formData);
    dispatch(addAuth(data));
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    cb();
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};
