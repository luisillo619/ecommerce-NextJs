import { signOut } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        <>
          <li>
            <Link
              href="/admin/products/new"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Nuevo Producto <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/products"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Todos los Productos <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/orders"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Todas las Ordenes <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/users"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Todos los Usuarios <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <hr />
        </>

        <li>
          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Tu Perfil
          </Link>
        </li>
        <li>
          <Link
            href="/profile/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Ordenes
          </Link>
        </li>
        <li>
          <Link
            href="/profile/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Actualizar Perfil
          </Link>
        </li>
        <li>
          <Link
            href="/profile/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Actualizar Contraseña
          </Link>
        </li>

        <li>
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
            Salir
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
