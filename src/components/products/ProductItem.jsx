import React from "react";
import Link from "next/link";
import { addItemToCart, selectCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import ReactRating from "react-rating";

import Image from "next/image";
import default_product from "../../../public/images/default_product.png";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const addToCardHandler = () => {
    const cartItem = cart.find((e) => e.product === product._id);
    if (cartItem) {
      const newQty = cartItem?.quantity + 1;

      const item = { ...cartItem, quantity: newQty };

      if (newQty > Number(cartItem.stock)) return;
      dispatch(addItemToCart(item));
    } else {
      dispatch(
        addItemToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product?.images[0] ? product?.images[0].url : null,
          stock: product.stock,
          seller: product.seller,
        })
      );
    }
  };

  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5 ">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={
                product?.images[0] ? product?.images[0].url : default_product
              }
              alt="product anme"
              height="240"
              width="240"
              priority="true"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              href={`/product/${product._id}`}
              className="hover:text-blue-600"
            >
              {product.name}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <ReactRating
                    initialRating={product?.ratings}
                    readonly
                    emptySymbol={
                      <StarIconOutline className="w-4 h-4 text-[#FAAF00]" />
                    }
                    fullSymbol={<StarIcon className="w-4 h-4 text-[#FAAF00]" />}
                  />
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{product?.ratings}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200 ">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              ${product?.price}
            </span>

            <p className="text-green-500">Envio Gratis</p>
            <div className="my-3">
              <button
                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                onClick={addToCardHandler}
              >
                Añade al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
