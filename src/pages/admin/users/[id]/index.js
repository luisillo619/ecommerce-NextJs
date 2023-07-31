import UpdateUser from "@/components/admin/UpdateUser";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const sessionToSend = {
      user: {
        id: session.user._id,
        role: session.user.role,
      },
    };

    const { data } = await axios.get(
      `${process.env.API_URL}/api/admin/users/${context.params.id}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );

    return {
      props: { data: data.user, session },
    };
  } catch (error) {
    console.error("Error fetching admin user data:", error);
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
