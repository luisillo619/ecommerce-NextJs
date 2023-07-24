import Link from "next/link";
import Search from "./Search.jsx";
import Image from "next/image";
import buyItNowLogo from "../../../public/images/logo.png";
import imagenProductDefault from "../../../public/images/default.png";

const Header = ({ user, cart }) => {
  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between md:space-x-4 lg:space-x-6 xl:space-x-8">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={buyItNowLogo}
                alt="BuyItNow"
                className="cursor-pointer object-contain"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <Search className="flex-grow lg:flex-grow-0 lg:w-96 lg:mx-10" />

          <div className="flex items-center space-x-2 mt-2 lg:mt-0">
            <Link
              href="/cart"
              className="px-3 py-2 inline-flex items-center text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="ml-1">
                Carrito (<b>{cart?.length || 0}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-flex items-center text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="ml-1">Sign in</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
