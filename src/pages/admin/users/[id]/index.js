import UpdateUser from "@/components/admin/UpdateUser";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession({ req: context.req });

    const { data } = await axios.get(
      `${process.env.API_URL}/api/admin/users/${context.params.id}`,
      {
        headers: {
          "x-user-session": JSON.stringify(session),
        },
      }
    );

    return {
      props: { data: data.user, session },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/admin/users",
        permanent: true,
      },
    };
  }
};

export default function AdminUserDetailsPage({ data, session }) {
  return (
    <AdminProfileLayout>
      <UpdateUser user={data} session={session} />
    </AdminProfileLayout>
  );
}
