import React, { Fragment } from "react";
import Link from "next/link";
import { addItemToCart, selectCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { toast, Zoom } from "react-toastify";
import Image from "next/image";
import default_product from "../../../public/images/default_product.png";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const addToCardHandler = () => {
    const cartItem = cart.find((e) => e.product === product._id);
    if (cartItem) {
      const newQty = cartItem.quantity + 1;

      const item = { ...cartItem, quantity: newQty };

      if (newQty > Number(cartItem.stock)) {
        return toast.error("Producto fuera de stock", {
          position: "bottom-right",
          autoClose: 500,
          transition: Zoom,
        });
      }
      dispatch(addItemToCart(item));
      return toast.success("Producto agregado al carrito", {
        position: "bottom-right",
        autoClose: 500,
        transition: Zoom,
      });
    } else {
      dispatch(
        addItemToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0] ? product.images[0].url : null,
          stock: product.stock,
          seller: product.seller,
        })
      );
    }
  };

  const CustomRating = ({ rating }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <StarIcon key={star} className="w-4 h-4 text-[#FAAF00]" />
        ) : (
          <StarIconOutline key={star} className="w-4 h-4 text-[#FAAF00]" />
        )
      )}
    </div>
  );

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-4 border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="col-span-12 md:col-span-3 p-3 flex items-center justify-center">
        <div className="w-48 h-48 md:w-60 md:h-52 relative">
          <Image
            src={product.images[0] ? product.images[0].url : default_product}
            alt="product name"
            layout="fill"
            objectFit="contain"
            priority="true"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 p-4">
        <Link href={`/product/${product._id}`}>
          <span className="text-lg font-semibold hover:text-blue-600">
            {product.name}
          </span>
        </Link>
        <div className="flex items-center space-x-2 my-2">
          <CustomRating rating={product.ratings} />
          <span className="text-yellow-500">{product.ratings}</span>
        </div>
        <p className="text-gray-500 mb-2">
          {product.description.substring(0, 150)}...
        </p>
      </div>
      <div className="col-span-12 md:col-span-3 lg:col-span-3 border-t md:border-t-0 md:border-l border-gray-200 p-5">
        <span className="text-xl font-semibold text-black">
          ${product?.price}
        </span>
        <p className="text-green-500 mt-1">Envío Gratis</p>
        <div className="my-3">
          <button
            className="px-4 py-2 w-full text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={addToCardHandler}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
