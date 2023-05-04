import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { setUser } from "@/redux/reducer/authSlice";
import { selectCart } from "@/redux/reducer/cartSlice";
import { selectUser } from "@/redux/reducer/authSlice";
import { useSession } from "next-auth/react";

export default function LayoutIndex({ children }) {
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const isLoaded = status === "authenticated" || status === "unauthenticated";

  useEffect(() => {
    if (isLoaded) {
      dispatch(setCart());
      if (data) {
        dispatch(setUser(data.user));
      }
    }
  }, [data, dispatch, isLoaded]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header user={user} cart={cart}/>
      {children}
    </>
  );
}