import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast, Zoom } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
  ({ name, email, password }, router) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
      });

      if (Object.keys(data).length > 0) {
        const data = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (data?.error) {
          toast.error(data?.error, {
            position: "bottom-right",
            autoClose: 1200,
            transition: Zoom,
          });
          setLoading(false);
        } else if (data?.ok) {
          toast.success("Bienvenido de vuelta", {
            position: "bottom-right",
            autoClose: 1500,
            transition: Zoom,
          });
          router.replace("/register");
        }
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.message;
      if (errorMessages) {
        const messagesArray = errorMessages.split(",");
        dispatch(
          setError(messagesArray[0] || error?.response?.data?.error?.message)
        );
      }
      dispatch(setLoading(false));
    }
  };

// El usuario actualizo su perfil y el estado necesita actualizarse
const loadUser = async (router, dispatch) => {
  try {
    const { data } = await axios.get("/api/auth/session?update=true");
    if (Object.keys(data).length > 0) {
      dispatch(setUser(data.user));
      toast.success("Informacion actualizada", {
        position: "bottom-right",
        autoClose: 1200,
        transition: Zoom,
      });
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

export const updateProfile =
  (formData, router, session) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { data } = await axios.put(`/api/auth/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-user-session": JSON.stringify(session),
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
      dispatch(setLoading(false));
    }
  };

export const updatePassword =
  ({ currentPassword, newPassword }, router, session) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.put(
        `/api/auth/profile/update_password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "x-user-session": JSON.stringify(session),
          },
        }
      );

      if (Object.keys(data).length > 0) {
        toast.success("Contraseña actualizada", {
          position: "bottom-right",
          autoClose: 1200,
          transition: Zoom,
        });
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
      dispatch(setLoading(false));
    }
  };

export const addNewAddress = (address, router, session) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`/api/address`, address, {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    });
    if (Object.keys(data).length > 0) {
      toast.success("Direccion creada", {
        position: "bottom-right",
        autoClose: 1200,
        transition: Zoom,
      });
      router.back();
    }
  } catch (error) {
    dispatch(setLoading(false));
    const errorMessages = error?.response?.data?.message;
    if (errorMessages) {
      const messagesArray = errorMessages.split(",");
      dispatch(
        setError(messagesArray[0] || error?.response?.data?.error?.message)
      );
    }
  }
};

export const updateAddress =
  (address, id, router, session) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { data } = await axios.put(`/api/address/${id}`, address, {
        headers: {
          "x-user-session": JSON.stringify(session),
        },
      });

      if (Object.keys(data).length > 0) {
        toast.success("Direccion actualizada", {
          position: "bottom-right",
          autoClose: 1200,
          transition: Zoom,
        });
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.error?.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteAddress =
  (id, router, session, setDeleteLoading) => async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/address/${id}`, {
        headers: { "x-user-session": JSON.stringify(session) },
      });
      if (data?.success) {
        toast.success("Direccion eliminada", {
          position: "bottom-right",
          autoClose: 1200,
          transition: Zoom,
        });
        router.replace(`/profile`);
      }
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message ||
            error?.response?.data?.error?.message
        )
      );
      setDeleteLoading(false);
    }
  };

export const { setUser, clearError, setError, setLoading } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state?.auth?.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
