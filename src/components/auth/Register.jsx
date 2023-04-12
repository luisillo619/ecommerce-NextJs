import { selectAuthError } from "@/redux/reducer/authSlice";
import Link from "next/link";
import  { useState, useEffect } from "react";
import { registerUser } from "@/redux/reducer/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "@/redux/reducer/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
        console.log(error);
      toast.error(error);
      dispatch(clearError())
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser({ name, email, password }))
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Registrar cuenta</h2>

        <div className="mb-4">
          <label className="block mb-1"> Nombre Completo </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Correo </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Ingresa tu correo"
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
        >
          Registrar
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Ya tienes una cuenta?
          <Link href="/login" className="text-blue-500">
            Ingresa
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
