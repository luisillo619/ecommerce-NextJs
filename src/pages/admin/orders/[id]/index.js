import UpdateOrder from "@/components/admin/UpdateOrder";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/${context.params.id}`,
    {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    }
  );

  return {
    props: { data: data.order },
  };
};

export default function AdminOrderDetailsPage({ data }) {
  return (
    <AdminProfileLayout>
      <UpdateOrder order={data} />
    </AdminProfileLayout>
  );
}
