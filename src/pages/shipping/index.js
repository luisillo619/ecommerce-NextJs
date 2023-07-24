import Shipping from "@/components/cart/Shipping";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const sessionToSend = { ...session };
  
  // Delete the avatar property
  if (sessionToSend.user?.avatar) {
    delete sessionToSend.user.avatar;
  }
  
  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      "x-user-session": JSON.stringify(sessionToSend),
    },
  });
  return {
    props: {
      addresses: data?.addresses,
      session,
    },
  };
};

export default function ShippingPage({ addresses, session }) {
  return <Shipping addresses={addresses} session={session} />;
}
