import Link from "next/link";
import Search from "./Search.jsx";
import Image from "next/image";
import buyItNowLogo from "../../../public/images/logo.png";
import imagenProductDefault from "../../../public/images/default.png";

const Header = ({ user, cart }) => {
  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image
                src={buyItNowLogo}
                alt="BuyItNow"
                className="cursor-pointer object-contain w-24 h-12"
                width={120}
                height={40}
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
                Carrito (<b>{cart?.length || 0}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Link href="/profile">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <Image
                    alt="BuyItNow"
                    className="cursor-pointer object-cover rounded-full w-10 h-10"
                    width={40}
                    height={40}
                    src={
                      user?.avatar ? user?.avatar?.url : imagenProductDefault
                    }
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user?.name}
                      <time className="block text-xs text-gray-500 dark:text-gray-400">
                        {user?.email?.substring(0, 35)}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Buscar</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
