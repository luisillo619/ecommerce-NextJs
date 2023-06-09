import React from "react";
import Link from "next/link";
import { addItemToCart, deleteItemFromCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@/redux/reducer/cartSlice";
import default_product from "../../../public/images/default_product.png";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  // tiene el limite en base al stock, agrega cantidad a un producto
  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    dispatch(addItemToCart(item));
  };

  // quita cantidad a un producto
  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    dispatch(addItemToCart(item));
  };

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
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-bold text-2xl">
            {cart?.length || 0} Elemento(s) en el Carrito
          </h1>
        </div>
      </section>

      {cart?.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.map((cartItem) => (
                    <div key={cartItem.product}>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <Image
                                  src={
                                    cartItem.image
                                      ? cartItem.image
                                      : default_product
                                  }
                                  alt={cartItem.name}
                                  width={64}
                                  height={64}
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="#" className="hover:text-blue-600">
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {" "}
                                Vendedor: {cartItem.seller}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ${cartItem.price * cartItem.quantity.toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ${cartItem.price} / por unidad{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                dispatch(deleteItemFromCart(cartItem?.product))
                              }
                            >
                              Eliminar
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Precio sin impuesto:</span>
                      <span>${amountWithoutTax}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Total de productos:</span>
                      <span className="text-green-500">
                        {cart?.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                        (unidades)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>impuesto:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Precio Total:</span>
                      <span>${totalAmount}</span>
                    </li>
                  </ul>

                  <Link
                    href="/shipping"
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Continuar
                  </Link>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Volver a los productos
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
