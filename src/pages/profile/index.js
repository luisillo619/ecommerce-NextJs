import Profile from "@/components/auth/Profile";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  // Como tenemos la ruta protegida en el back con el middleware no podemos mandar directamente la solicitud o la ruta nos dara error aunque estemos logeados, tenemos que mandarle la cookie de la sesion
  const session = await getSession({ req });
  if (session) {
    const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
      headers: {
        'X-User-Id': session.user._id,
      },
    });
    return {
      props: {
        data,
      },
    };
  }
};

export default function ProfilePage({ data }) {
  return (
    <UserProfileLayout>
      <Profile data={data} />
    </UserProfileLayout>
  );
}
