import React, { useEffect } from "react";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducer/authSlice";
import { useSession } from "next-auth/react"; //FRONT

export default function LayoutIndex({ children }) {
  // añadir estado inicial del carrito y de la sesion del usuario a redux
  const dispatch = useDispatch();
  const { data } = useSession(); // obtener la sesion del ususario si existe
  
  useEffect(() => {
    dispatch(setCart());
    dispatch(setUser(data?.user));
  }, [data]);

  return (
    <>
      <Header />
      {children}
     
    </>
  );
}


