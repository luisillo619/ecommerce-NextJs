import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import { selectUser } from "@/redux/reducer/authSlice";
import { useSelector } from "react-redux";

const Profile = ({ data }) => {
  const user = useSelector(selectUser);
 
  return (
    <>
      <figure className="flex flex-col items-start sm:items-center sm:flex-row ">
        <div className="relative w-0 sm:w-auto ">
          <img
            className="hidden w-16 h-16 rounded-full mr-4 sm:block"
            src={user?.avatar ? user?.avatar?.url : "/images/default.png"}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Correo:</b> {user?.email} | <b>Te uniste el:</b>{" "}
            {user?.createdAt?.substring(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses addresses={data.addresses} />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Nueva dirección
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;