import UpdateOrder from "@/components/admin/UpdateOrder";
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
      `${process.env.API_URL}/api/admin/orders/${context.params.id}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );

    return {
      props: { data: data.order, session },
    };
  } catch (error) {
    console.error("Error fetching admin orders data:", error);
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: true,
      },
    };
  }
};

export default function AdminOrderDetailsPage({ data, session }) {
  return (
    <AdminProfileLayout>
      <UpdateOrder order={data} session={session} />
    </AdminProfileLayout>
  );
}
