import React, { useEffect, useState } from "react";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducer/authSlice";
import { useSession } from "next-auth/react";

export default function LayoutIndex({ children }) {
  // Añadir estado inicial del carrito y de la sesión del usuario a redux
  const dispatch = useDispatch();
  const { data } = useSession(); // Obtener la sesión del usuario si existe
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(setCart());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
    setIsLoaded(true);
  }, [data, dispatch]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
