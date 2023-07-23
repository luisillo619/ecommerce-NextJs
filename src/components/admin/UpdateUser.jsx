
import { clearError, selectAuthError, selectLoading, setLoading, updateUser } from "@/redux/reducer/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateUser = ({ user,session }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectLoading);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
      });
      dispatch(clearError());
    }
  }, [error]);

  const submitHandler = (e) =>{
    e.preventDefault()
    const userData = {name,email,role}
    dispatch(updateUser(user._id,userData,router,session))
  }

  useEffect(() => {
    return () => dispatch(setLoading(false));
  }, []);
  

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Actualizar Usuario</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
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
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1"> Rol </label>
          <div class="relative">
            <select
              class="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              name="category"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {["user", "admin"].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <i class="absolute inset-y-0 right-0 p-2 text-gray-400">
              <svg
                width="22"
                height="22"
                class="fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z"></path>
              </svg>
            </i>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={loading ? true : false}
        >
         {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;