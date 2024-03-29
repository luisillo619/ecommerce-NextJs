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
    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };
    const { data } = await axios.post(`/api/admin/products`, product, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
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

export const updateProduct =
  (product, router, session, id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const sessionToSend = {
        user: {
          id: session.user._id,
          role: session.user.role,
        },
      };
      const { data } = await axios.put(`/api/admin/products/${id}`, product, {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      });

      if (data?.success) {
        toast.success("Producto Actualizado", {
          position: "bottom-right",
          autoClose: 1500,
          transition: Zoom,
        });
        router.replace(`/admin/products/${id}`);
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

export const deleteProduct = (router, session, id) => async (dispatch) => {
  try {
    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };
    const { data } = await axios.delete(`/api/admin/products/${id}`, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
      },
    });

    if (data?.success) {
      toast.success("Producto Eliminado", {
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
  }
};

export const uploadProductImages =
  (formdata, id, session, router) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const sessionToSend = {
        user: {
          id: session.user._id,
          role: session.user.role,
        },
      };
      const { data } = await axios.post(
        `/api/admin/products/upload_images/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-user-session": JSON.stringify(sessionToSend),
          },
        }
      );

      if (data?.success) {
        toast.success("Imagenes Cargadas", {
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

export const postReview = (router, session, reviewData) => async (dispatch) => {
  try {
    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };
    const { data } = await axios.put(`/api/products/review`, reviewData, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
      },
    });

    if (data?.success) {
      toast.success("Comentario Creado", {
        position: "bottom-right",
        autoClose: 1500,
        transition: Zoom,
      });
      router.replace(`/product/${reviewData?.productId}`);
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

export const { clearError, setError, setLoading } = productSlice.actions;

export const selectLoading = (state) => state?.product?.loading;
export const selectProductError = (state) => state.product.error;

export default productSlice.reducer;
