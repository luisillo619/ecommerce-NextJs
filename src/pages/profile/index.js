import Profile from "@/components/auth/Profile";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
      headers: {
        "x-user-session": JSON.stringify(session),
      },
    });
    return {
      props: {
        data,
      },
    };
  }
};

export default function ProfilePage({ data }) {
  return (
    // <UserProfileLayout>
    //   <Profile data={data} />
    // </UserProfileLayout>
    <h1>holaaaaa</h1>
  );
}
