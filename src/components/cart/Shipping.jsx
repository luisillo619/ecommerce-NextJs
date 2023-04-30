import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BreadCrumbs from "../layouts/BreadCrumbs";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/reducer/cartSlice";
import defaultProduct from "../../../public/images/default_product.png";
import Image from "next/image";
import axios from "axios";

const Shipping = ({ addresses, session }) => {
  const cart = useSelector(selectCart);

  const [shippingInfo, setShippinInfo] = useState("");

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };

  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return toast.error("Por favor, selecciona una direccion de envio");
    }
    try {
      const { data } = await axios.post(
        `/api/orders/checkout_session`,
        {
          items: cart,
          shippingInfo,
        },
        {
          headers: {
            "x-user-session": JSON.stringify(session),
          },
        }
      );
      window.location.href = data.url; // se abre la ventana de stripe
    } catch (error) {
      console.log(error);
    }
  };

  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
    { name: "Order", url: "" },
  ];

  // cantidad sin impuesto
  const amountWithoutTax = cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  // impuesto
  const taxAmount = (amountWithoutTax * 0.15).toFixed(3);

  // cantidad con impuesto
  const totalAmount = (
    parseFloat(amountWithoutTax) + parseFloat(taxAmount)
  ).toFixed(2);

  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">
                  Informacion de envio
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address) => (
                    <label
                      key={address._id}
                      className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                      onClick={() => setShippingAddress(address)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                        />
                      </span>
                      <p className="ml-2">
                        <span>{address.street}</span>
                        <small className="block text-sm text-gray-400">
                          {address.city}, {address.state}, {address.zipCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNo}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <Link
                  href="/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <i className="mr-1 fa fa-plus"></i> Agregar una nueva
                  direccion
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a
                    className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    Pagar
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Resumen</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Precio sin impuesto:</span>
                    <span>${amountWithoutTax}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>impuesto:</span>
                    <span>${taxAmount}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Precio Total:</span>
                    <span className="text-gray-900 font-bold">
                      ${totalAmount}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                <div className="overflow-auto max-h-96 ">
                  {cart?.map((item) => (
                    <figure
                      key={item.product}
                      className="flex items-center mb-4 leading-5"
                    >
                      <div>
                        <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                          <Image
                            className="w-full h-full object-fill"
                            width={80}
                            height={80}
                            src={item?.image ? item.image : defaultProduct}
                            alt={item.name}
                          />
                          <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <figcaption className="ml-3">
                        <p>{item.name.substring(0, 50)}</p>
                        <p className="mt-1 text-gray-400">
                          Total: ${item.quantity * item.price}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
