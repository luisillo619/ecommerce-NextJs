import { useRef } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { toast, Zoom } from "react-toastify";
import BreadCrumbs from "../layouts/BreadCrumbs";
import { addItemToCart, selectCart } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const imgRef = useRef(null);

  const setImgPreview = (url) => {
    imgRef.current.src = url;
  };

  const inStock = product?.stock >= 1;

  const addToCardHandler = () => {
    const cartItem = cart.find((e) => e.product === product._id);

    if (cartItem) {
      const newQty = cartItem?.quantity + 1;

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
      if (inStock) {
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
        return toast.success("Producto agregado al carrito", {
          position: "bottom-right",
          autoClose: 500,
          transition: Zoom,
        });
      }
    }
  };

  const breadCrumbs = [
    { name: "Inicio", url: "/" },
    {
      name: `${product?.name?.substring(0, 100)} ...`,
      url: `/product/${product?._id}`,
    },
  ];

  const CustomRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          return star <= rating ? (
            <StarIcon key={star} className="w-4 h-4 text-[#FAAF00]" />
          ) : (
            <StarIconOutline key={star} className="w-4 h-4 text-[#FAAF00]" />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5 h-96 flex items-center justify-center">
                <img
                  ref={imgRef}
                  className="object-contain inline-block max-h-96"
                  src={
                    product?.images[0]
                      ? product?.images[0].url
                      : "/images/default_product.png"
                  }
                  alt="Product title"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img, key) => (
                  <a
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                    key={key}
                    onClick={() => setImgPreview(img?.url)}
                  >
                    <Image
                      className="w-14 h-14"
                      src={img.url}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <CustomRating rating={product?.ratings} />
                </div>
                <span className="text-yellow-500">{product?.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verificado</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${product?.price}</p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={addToCardHandler}
                  disabled={!inStock}
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Añadir al carrito
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {inStock ? (
                    <span className="text-green-500">En Stock</span>
                  ) : (
                    <span className="text-red-500">Fuera de Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Categoria:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">
                    Vendedor / Marca:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>

          {/* <NewReview /> */}
          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Otras Calificaciones
            </h1>
            {/* <Reviews /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
