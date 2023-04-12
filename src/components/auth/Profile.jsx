// import UserAddresses from "../user/UserAddresses";

import Link from "next/link";
import { selectUser } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(selectUser);
  
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar ? user?.avatar?.url : "/images/default.png"}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Correo:</b> {user?.email} | <b>Te uniste el:</b>
            {user?.createdAt}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      {/* <UserAddresses /> */}

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Nueva direccion
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
