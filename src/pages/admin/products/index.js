import React from "react";
import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/Products";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
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

    const urlParams = {
      page: context.query.page,
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`,
      {
        headers: {
          "x-user-session": JSON.stringify(sessionToSend),
        },
      }
    );

    return {
      props: {
        data,
        session,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        data: [],
        session: null,
      },
    };
  }
};

const AdminProductsPage = ({ data, session }) => {
  return (
    <AdminProfileLayout>
      <Products data={data} session={session} />;
    </AdminProfileLayout>
  );
};

export default AdminProductsPage;
