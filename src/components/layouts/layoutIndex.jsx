import React, { useEffect } from "react";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
export default function LayoutIndex({ children }) {
  // añadir estado inicial del carrito a redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCart());
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
