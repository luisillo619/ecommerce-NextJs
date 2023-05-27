import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, Zoom } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    error: null,
    loading: null,
  },
  reducers: {
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

export const updateOrder =
  (orderData, router, session, id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.put(`/api/admin/orders/${id}`, orderData, {
        headers: {
          "x-user-session": JSON.stringify(session),
        },
      });

      if (data?.success) {
        toast.success("Estado Actualizado", {
          position: "bottom-right",
          autoClose: 1500,
          transition: Zoom,
        });
        router.replace(`/admin/orders/${id}`);
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

export const deleteOrder = (router, session, id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/admin/orders/${id}`, {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    });

    if (data?.success) {
      toast.success("Orden Eliminada", {
        position: "bottom-right",
        autoClose: 1500,
        transition: Zoom,
      });
      router.replace(`/admin/orders`);
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

export const { clearError, setError, setLoading } = orderSlice.actions;

export const selectLoading = (state) => state?.product?.loading;
export const selectOrderError = (state) => state.product.error;

export default orderSlice.reducer;
