import React from "react";
import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/Products";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const urlParams = {
    page: context.query.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );

  return {
    props: {
      data,
      session,
    },
  };
};

const AdminProductsPage = ({ data, session }) => {
  return (
    <AdminProfileLayout>
      <Products data={data} session={session} />;
    </AdminProfileLayout>
  );
};

export default AdminProductsPage;
