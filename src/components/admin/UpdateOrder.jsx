import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  updateOrder,
  setLoading,
  clearError,
  selectOrderError,
  selectLoading,
} from "@/redux/reducer/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

const UpdateOrder = ({ order, session }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector(selectOrderError);
  const loading = useSelector(selectLoading);

  const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

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

  const submitHandler = () => {
    const orderData = { orderStatus };

    dispatch(updateOrder(orderData, router, session, order?._id, ));
  };

  useEffect(() => {
    return () => dispatch(setLoading(false));
  }, []);

  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Id de Orden: {order?._id} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">{order?.createAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Datos Personales</p>
          <ul className="text-gray-600">
            <li>{order?.user?.name}</li>
            <li>Telefono: {order?.shippingInfo?.phoneNumber}</li>
            <li>Correo: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Direccion de envio</p>
          <ul className="text-gray-600">
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.zipCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Datos de pago</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>Impuesto: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total Pagado: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4" key={item.product}>
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.image}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div class="my-8">
        <label class="block mb-3"> Actualizar el Estado de la Orden </label>
        <div class="relative">
          <select
            class="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            {["Processing", "Shipped", "Delivered"].map((status) => (
              <option key={status} value={status}>
                {status}
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
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        onClick={() => submitHandler()} 
        disabled={loading ? true : false}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
  
    </article>
  );
};

export default UpdateOrder;