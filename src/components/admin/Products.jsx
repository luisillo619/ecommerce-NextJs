import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  selectProductError,
  setLoading,
  clearError,
} from "@/redux/reducer/productSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "react-modal";

const Products = ({ data, session }) => {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productIdNameToDelete, setProductIdNameToDelete] = useState({});

  const dispatch = useDispatch();
  const error = useSelector(selectProductError);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const deleteHandler = (id, name) => {
    setModalIsOpen(true);
    setProductIdNameToDelete({
      name,
      id,
    });
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(router, session, productIdNameToDelete.id));
    setModalIsOpen(false);
  };

  useEffect(() => {
    return () => dispatch(setLoading(false));
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-6 font-bold">
        {data?.productsCount} Productos
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr className="bg-white" key={product?.name}>
              <td className="px-6 py-2">{product?.name}</td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">${product?.price}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/products/${product?._id}/upload_images`}
                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-image" aria-hidden="true"></i>
                  </Link>

                  <Link
                    href={`/admin/products/${product?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => deleteHandler(product?._id, product?.name)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-5 flex justify-center">
        <CustomPagination
          resPerPage={data?.resPerPage}
          productsCount={data?.filteredProductsCount}
          loading={loadingState}
          setLoading={setLoadingState}
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
              ¿Estás seguro de que deseas eliminar el siguiente
              producto?
            </p>
            <div className="space-y-2">
              <p>{productIdNameToDelete.name}.</p>
              <p>{productIdNameToDelete.id}</p>
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
    </div>
  );
};

export default Products;
