import { createSlice } from "@reduxjs/toolkit";

// DESPUES PODEMOS AGREGAR UN MODELO CARRITO CON USUSARIO PARA QUE SE SETCART SE HAGA DESDE LA BASE DE DATOS Y NO DESDE LOCAL STORGE
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCart: (state) => {
      state.cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")) // [{},{}]
        : [];
    },
    // agrega o quita productos del carrito
    addItemToCart: (state, action) => {
      const {
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1, // cantidad de un solo producto
      } = action.payload;
  
      const isItemExist = state.cartItems?.find((i) => i.product === product);
      let newCartItems;

      if (isItemExist) {
        // Si ya exitia, se agrega la nueva cantidad al producto o se deja igual
        newCartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? { ...i, quantity } : i
        );
      } else {
        // Si no existia, se agrega lo que se tenia más el nuevo producto
        newCartItems = [
          ...state.cartItems,
          { product, name, price, image, stock, seller, quantity },
        ];
      }
     
      // newCartItems = [{},{}]
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      state.cartItems = newCartItems;
    },

    // elimina un producto del carrito
    deleteItemFromCart: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(newCartItems));
      state.cartItems = newCartItems;
    },
  },
});

export const { setCart, addItemToCart, deleteItemFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cartItems;
export default cartSlice.reducer;

