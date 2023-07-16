import Users from "@/components/admin/Users";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
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
    `${process.env.API_URL}/api/admin/users?${searchQuery}`,
    {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    }
  );

  return {
    props: { data,session },
  };
};

export default function AdminUsersPage({ data,session }) {
  return (
    <AdminProfileLayout>
      <Users users={data} session={session}/>
    </AdminProfileLayout>
  );
}
