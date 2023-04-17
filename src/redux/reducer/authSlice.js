import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        { name, email, password }
      );

      if (Object.keys(data).length > 0) {
        window.location.href = window.location.origin;
      }
    } catch (error) {
      console.log(error?.response?.data?.error);
      dispatch(setError(error?.response?.data?.error?.message));
    }
  };

export const addNewAddress = (address) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/api/address`,
      address
    );
    if (Object.keys(data).length > 0) {
      window.location.href = window.location.origin + "/profile";
    }
  } catch (error) {
    console.log(error?.response?.data?.error);
    dispatch(setError(error?.response?.data?.error?.message));
  }
};

export const { setUser, clearError, setError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
