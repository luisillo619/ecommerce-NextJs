import UpdateAddress from "@/components/user/UpdateAddress";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const req = context.req;

  const session = await getSession({ req });

  if (session) {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/address/${id}`,
      {
        headers: {
          "x-user-session": JSON.stringify(session),
        },
      }
    );

    return {
      props: {
        addressData: data?.address || null,
        session,
      },
    };
  }
};

export default function UpdateAddressPage({ addressData, session }) {
  return <UpdateAddress addressData={addressData} session={session} />;
}
