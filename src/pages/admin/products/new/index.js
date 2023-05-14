import NewProduct from "@/components/admin/NewProduct";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
};

export default function NewProductPage({ session }) {
  return (
    <AdminProfileLayout>
      <NewProduct session={session} />
    </AdminProfileLayout>
  );
}
