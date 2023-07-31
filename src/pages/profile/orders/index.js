import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import ListOrders from "@/components/orders/ListOrders";
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
      `${process.env.API_URL}/api/orders/me?${searchQuery}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );
    data = response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    data = [];
  }
  
  return {
    props: { data },
  };
};

export default function MyOrdersPage({ data }) {
  return (
    <UserProfileLayout>
      <ListOrders orders={data} />
    </UserProfileLayout>
  );
}
