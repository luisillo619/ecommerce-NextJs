import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import ListOrders from "@/components/orders/ListOrders";
import axios from "axios";
import { getSession } from "next-auth/react";
import queryString from "query-string";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const urlParams = {
    page: context.query.page || 1,
  };
  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/orders/me?${searchQuery}`,
    {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    }
  );

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
