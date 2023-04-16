import Profile from "@/components/auth/Profile";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import axios from "axios";

export const getServerSideProps = async (context) => {
  // Como tenemos la ruta protegida en el back con el middleware no podemos mandar directamente la solicitud o la pagina nos dara error aunque estemos logeados, tenemos que mandarle la cookie de la sesion

  
  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${context.req?.cookies["next-auth.session-token"]}`,
    },
  });

  return {
    props: {
      data,
    },
  };
};

export default function ProfilePage({ data }) {
  return <UserProfileLayout>
    <Profile data={data} />
    </UserProfileLayout>;
}
