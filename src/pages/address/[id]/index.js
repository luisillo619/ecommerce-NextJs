import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import UpdateAddress from "@/components/user/UpdateAddress";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const req = context.req;
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
    const response = await axios.get(`${process.env.API_URL}/api/address/${id}`, {
      headers: {
        "x-user-session": JSON.stringify(sessionToSend),
      },
    });
    data = response.data;
  } catch (error) {
    data = { address: null };
  }

  return {
    props: {
      addressData: data?.address,
      session,
    },
  };
};

export default function UpdateAddressPage({ addressData, session }) {
  return (
    <UserProfileLayout>
      <UpdateAddress addressData={addressData} session={session} />
    </UserProfileLayout>
  );
}
