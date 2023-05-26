import UpdateProduct from "@/components/admin/UpdateProduct";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/${context.params.id}`
  );

  return {
    props: { session, data: data.product },
  };
};

export default function UpdateProductPage({ session, data }) {
  return (
    <AdminProfileLayout>
      <UpdateProduct session={session} data={data} />
    </AdminProfileLayout>
  );
}
