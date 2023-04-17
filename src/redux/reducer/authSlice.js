import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    updated: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
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
      const errorMessages = error?.response?.data?.message;
      if (errorMessages) {
        const messagesArray = errorMessages.split(",");
        dispatch(
          setError(messagesArray[0] || error?.response?.data?.error?.message)
        );
      }
    }
  };

export const addNewAddress = (address, router) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/api/address`,
      address
    );
    if (Object.keys(data).length > 0) {
      router.push("/profile");
    }
  } catch (error) {
    const errorMessages = error?.response?.data?.message;
    if (errorMessages) {
      const messagesArray = errorMessages.split(",");
      dispatch(
        setError(messagesArray[0] || error?.response?.data?.error?.message)
      );
    }
  }
};

export const updateAddress = (address, id, router) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/api/address/${id}`,
      address
    );

    if (Object.keys(data).length > 0) {
      dispatch(setUpdated(true));
      router.replace(`/address/${id}`);
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error?.message));
  }
};

export const deleteAddress = (id, router) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.API_URL}/api/address/${id}`
    );
    if (data?.success) {
      router.push(`/profile`);
    }
  } catch (error) {
    dispatch(
      setError(
        error?.response?.data?.message || error?.response?.data?.error?.message
      )
    );
  }
};

export const { setUser, setUpdated, clearError, setError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectUpdated = (state) => state.auth.updated;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
