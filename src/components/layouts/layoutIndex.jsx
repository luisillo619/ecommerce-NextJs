import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { setCart } from "@/redux/reducer/cartSlice";
import { setUser } from "@/redux/reducer/authSlice";
import { selectCart } from "@/redux/reducer/cartSlice";
import { selectUser } from "@/redux/reducer/authSlice";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

export default function LayoutIndex({ children }) {
  const dispatch = useDispatch();
  const { status, data } = useSession();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const router = useRouter();
  const hideNavbarRoutes = ["/_error"];
  const shouldHideNavbar = hideNavbarRoutes.includes(router.pathname);

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

  useEffect(() => {
    if (router?.query?.keyword) {
      router.replace(`/?keyword=${router?.query?.keyword}`);
    }
  }, [router?.query?.keyword]);

  return (
    <>
      {user !== null ? (
        <>
          {!shouldHideNavbar && <Header user={user} cart={cart} />}
          {children}
        </>
      ) : (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <ClipLoader color={"#365ad6"} size={60} />
          <h2 className="mt-4 text-lg font-semibold text-blue-600">
            Cargando...
          </h2>
        </div>
      )}
    </>
  );
}
