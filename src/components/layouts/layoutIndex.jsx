import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { setUser } from "@/redux/reducer/authSlice";
import { selectCart } from "@/redux/reducer/cartSlice";
import { selectUser } from "@/redux/reducer/authSlice";
import { useSession } from "next-auth/react";

export default function LayoutIndex({ children }) {
  const dispatch = useDispatch();
  const { status, data } = useSession();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(setCart());
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(setUser(data.user));
    } else if (status === "unauthenticated") {
      dispatch(setUser({}));
    }
  }, [status]);

  return (
    <>
      {/* {user !== null && ( */}
        <>
          <Header user={user} cart={cart} />
          {children}
        </>
      {/* )} */}
    </>
  );
}
