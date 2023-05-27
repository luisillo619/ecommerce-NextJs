import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "../reducer/cartSlice";
import authReducer from "../reducer/authSlice";
import productReducer from "../reducer/productSlice";
import orderReducer from "../reducer/orderSlice";

import thunkMiddleware from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
  middleware,
});
