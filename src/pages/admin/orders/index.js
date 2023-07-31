import Orders from "@/components/admin/Orders";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";
import queryString from "query-string";

export const getServerSideProps = async (context) => {
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

  let data;
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/admin/orders?${searchQuery}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );
    data = response.data;
  } catch (error) {
    console.error("Error fetching admin orders data:", error);
    data = [];
  }

  return {
    props: { data, session },
  };
};

export default function AdminOrdersPage({ data,session }) {
  return (
    <AdminProfileLayout>
      <Orders orders={data}  session={session}/>
    </AdminProfileLayout>
  );
}
