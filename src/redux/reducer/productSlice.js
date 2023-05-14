import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, Zoom } from "react-toastify";

const productSlice = createSlice({
  name: "product",
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

export const newProduct = (product, router, session) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`/api/admin/products`, product, {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    });

    if (data?.success) {
      toast.success("Producto Creado", {
        position: "bottom-right",
        autoClose: 1500,
        transition: Zoom,
      });
      router.replace("/admin/products");
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

export const { clearError, setError, setLoading } = productSlice.actions;

export const selectLoading = (state) => state?.product?.loading;
export const selectProductError = (state) => state.product.error;

export default productSlice.reducer;
