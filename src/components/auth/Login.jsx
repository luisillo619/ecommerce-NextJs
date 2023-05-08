import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { toast, Zoom } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (data?.error) {
      toast.error(data?.error, {
        position: "bottom-right",
        autoClose: 1200,
        transition: Zoom,
      });
      setLoading(false);
    } else if (data?.ok) {
      toast.success("Bienvenido de vuelta", {
        position: "bottom-right",
        autoClose: 1200,
        transition: Zoom,
      });
      router.refresh();
    }
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-600">
          Ingresa
        </h2>

        <div>
          <label className="block mb-1 font-medium">Correo</label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Ingresa tu contraseña"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={loading ? true : false}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <hr className="mt-4" />

        <div className="text-center">
          <p>
            No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-500">
              Registrate
            </Link>
          </p>
          <p>o</p>
          <p className="mb-2">Ingresa con Google</p>
          <button
            className="inline-flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            type="button"
            onClick={() => signIn("google")}
          >
            <i className="fab fa-google"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
