import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await signIn("credentials", {
      email,
      password,
      // callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
      redirect: false
    });

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("https://ecommerce-next-js-delta.vercel.app/profile")
      // router.beforePopState(({ url, as, options }) => {
      //   if (url !== "/profile") {
      //     return true; // Permite la navegación si la URL de destino no es "/profile"
      //   }
      //   return false; // Cancela la navegación si la URL de destino es "/profile"
      // });
      router.push("/");
    }
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Ingresa</h2>

        <div className="mb-4">
          <label className="block mb-1"> Correo </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Contraseña </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Ingresar
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-500">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
