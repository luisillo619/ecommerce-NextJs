import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomPagination from "../layouts/CustomPagination";
import {
  clearError,
  deleteUser,
  selectAuthError,
} from "@/redux/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Modal from "react-modal";


const Users = ({ users, session }) => {
  const [loading, setLoading] = useState();
  const error = useSelector(selectAuthError);
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState()
  const dispatch = useDispatch();

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

  const deleteHandler = (id) => {
    setModalIsOpen(true);
    setUserIdToDelete(id);
  };
  
  const confirmDelete = () =>{
    dispatch(deleteUser(router, session, userIdToDelete));
    setModalIsOpen(false);
  }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {users?.users?.length} Usuarios
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user) => (
            <tr key={user?._id} className="bg-white">
              <td className="px-6 py-2">{user?.name}</td>
              <td className="px-6 py-2">{user?.email}</td>
              <td className="px-6 py-2">{user?.role}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/users/${user?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => deleteHandler(user?._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {users?.users?.length > users.resPerPage && ( */}
      <div className="mb-6">
        <CustomPagination
          resPerPage={users?.resPerPage}
          productsCount={users?.usersCount}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirmar eliminación"
        className="flex items-center justify-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="w-96 p-10 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-center space-y-5">
            <p>
              ¿Estás seguro de que deseas eliminar la orden con el siguiente ID?
            </p>
            <div className="space-y-2">
              <p>{userIdToDelete}</p>
            </div>
          </h2>
          <div className="flex justify-center space-x-5">
            <button
              className="px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded cursor-pointer  hover:bg-blue-500 hover:text-white"
              onClick={() => setModalIsOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded cursor-pointer hover:bg-red-700"
              onClick={confirmDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      {/* )} */}
    </div>
  );
};

export default Users;
