import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteAddress,
  selectAuthError,
  selectLoading,
  setLoading,
  setUpdated,
  updateAddress,
} from "@/redux/reducer/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const UpdateAddress = ({ addressData, session }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const updateLoading = useSelector(selectLoading);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  const countriesList = Object.values(countries);

  const [address, setAddress] = useState({
    street: addressData?.street,
    city: addressData?.city,
    state: addressData?.state,
    zipCode: addressData?.zipCode,
    phoneNumber: addressData?.phoneNumber,
    country: addressData?.country,
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateAddress(address, addressData._id, router, session));
  };

  const deleteHandler = () => {
    setDeleteLoading(true);
    dispatch(deleteAddress(addressData._id, router, session));
  };

  useEffect(() => {
    return () => setDeleteLoading(false);
  }, []);

  return (
    <>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <form onSubmit={submitHandler}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Actualizar direccion
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Calle* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Escribe tu direccion"
                      name="street"
                      value={address.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Ciudad </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Escribe tu ciudad"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Estado </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Escribe tu estado"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> ZIP code </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Escribe tu codigo postal"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Numero telefonico </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Escribe tu numero"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Pais </label>
                    <select
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      name="country"
                      value={address.country}
                      onChange={handleChange}
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <button
                      type="submit"
                      className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      disabled={updateLoading || deleteLoading ? true : false}
                    >
                      {updateLoading ? "Actualizando..." : "Actualizar"}
                    </button>
                    <button
                      type="button"
                      className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                      onClick={deleteHandler}
                      disabled={deleteLoading || updateLoading ? true : false}
                    >
                      {deleteLoading ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateAddress;
