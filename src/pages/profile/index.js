import Profile from "@/components/auth/Profile";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
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

  let data;
  try {
    const response = await axios.get(`${process.env.API_URL}/api/address`, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
      },
    });
    data = response.data;
  } catch (error) {
    console.error("Error fetching address data:", error);
    data = {};
  }
  
  return {
    props: {
      data,
    },
  };
};

export default function ProfilePage({ data }) {
  return (
    <UserProfileLayout>
      <Profile data={data} />
    </UserProfileLayout>
  );
}