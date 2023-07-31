import Users from "@/components/admin/Users";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";
import queryString from "query-string";

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

    const urlParams = {
      page: context.query.page || 1,
    };
    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(
      `${process.env.API_URL}/api/admin/users?${searchQuery}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );

    return {
      props: { data, session },
    };
  } catch (error) {
    console.error("Error fetching admin users data:", error);
    return {
      props: {
        data: [],
        session: null,
      },
    };
  }
};

export default function AdminUsersPage({ data,session }) {
  return (
    <AdminProfileLayout>
      <Users users={data} session={session}/>
    </AdminProfileLayout>
  );
}
