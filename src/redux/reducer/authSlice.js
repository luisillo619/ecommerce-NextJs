import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    updated: null,
    loading: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
      const { data } = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
      });

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

// El usuario actualizo su perfil y el estado necesita actualizarse
const loadUser = async (router, dispatch) => {
  try {
    const { data } = await axios.get("/api/auth/session?update");

    if (Object.keys(data).length > 0) {
      dispatch(setUser(data.user));
      router.replace("/profile");
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

export const updateProfile = (formData, router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.put(`/api/auth/profile/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (Object.keys(data).length > 0) {
      await loadUser(router, dispatch);
    }
  } catch (error) {
    const errorMessages = error?.response?.data?.message;
    if (errorMessages) {
      const messagesArray = errorMessages.split(",");
      dispatch(
        setError(messagesArray[0] || error?.response?.data?.error?.message)
      );
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const updatePassword =
  ({ currentPassword, newPassword }, router) =>
  async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/auth/profile/update_password`, {
        currentPassword,
        newPassword,
      });

      if (Object.keys(data).length > 0) {
        router.replace("/profile");
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
    const { data } = await axios.post(`/api/address`, address);
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
    const { data } = await axios.put(`/api/address/${id}`, address);

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
    const { data } = await axios.delete(`/api/address/${id}`);
    if (data?.success) {
      router.replace(`/profile`);
    }
  } catch (error) {
    dispatch(
      setError(
        error?.response?.data?.message || error?.response?.data?.error?.message
      )
    );
  }
};

export const { setUser, setUpdated, clearError, setError, setLoading } =
  authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUpdated = (state) => state.auth.updated;
export const selectLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
