import { selectAuthError, selectLoading } from "@/redux/reducer/authSlice";
import Link from "next/link";
import { useState, useEffect } from "react";
import { registerUser } from "@/redux/reducer/authSlice";
import { toast, Zoom } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "@/redux/reducer/authSlice";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectLoading);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error,{
        position: "bottom-right",
        autoClose: 1200,
        transition: Zoom,
      });
      dispatch(clearError());
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }, router));
  };

  return (
  <div
    style={{ maxWidth: "480px" }}
    className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
  >
    <form onSubmit={submitHandler} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center text-blue-600">
        Registrar cuenta
      </h2>

      <div>
        <label className="block mb-1 font-medium">Nombre Completo</label>
        <input
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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
        {loading ? "Registrando..." : "Registrar"}
      </button>

      <hr className="mt-4" />

      <div className="text-center">
        <p>
          Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-blue-500">
            Ingresa
          </Link>
        </p>
        <p className="font-medium">o</p>
        <p className="mb-2">Registrate con Google</p>
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

export default Register;
