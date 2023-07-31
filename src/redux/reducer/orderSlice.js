import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, Zoom } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    error: null,
    loading: null,
    canReview: null,
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
    setCanReview: (state, action) => {
      state.canReview = action.payload;
    },
  },
});

export const updateOrder =
  (orderData, router, session, id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const sessionToSend = {
        user: {
          id: session.user._id,
          role: session.user.role,
        },
      };
      const { data } = await axios.put(`/api/admin/orders/${id}`, orderData, {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
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
    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };
    const { data } = await axios.delete(`/api/admin/orders/${id}`, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
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

export const canUserReview = (id, session) => async (dispatch) => {
  try {
    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };
    const { data } = await axios.get(`/api/orders/can_review?productId=${id}`, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
      },
    });

    if (data?.canReview) {
      dispatch(setCanReview(data?.canReview));
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

export const { clearError, setError, setLoading, setCanReview } =
  orderSlice.actions;

export const selectLoading = (state) => state?.order?.loading;
export const selectOrderError = (state) => state.order.error;
export const selectCanReview = (state) => state.order.canReview;

export default orderSlice.reducer;
