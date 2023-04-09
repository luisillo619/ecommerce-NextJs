import Link from "next/link";
import Search from "./Search.jsx";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/reducer/cartSlice.js";

const Header = () => {
  const cart = useSelector(selectCart);

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5 ">
            <Link href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Carrito (<b>{cart.length}</b>)
              </span>
            </Link>
            <Link
              href="/login"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-user"></i>
              <span className="hidden lg:inline ml-1">Ingresa</span>
            </Link>
            <Link href="/me">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full"
                  src={"/images/default.png"}
                />
                <div className="space-y-1 font-medium">
                  <p>
                    Luis
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                      test@gmail.com
                    </time>
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Abrir menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;