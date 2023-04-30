import Shipping from "@/components/cart/Shipping";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({req}) => {
  const session = await getSession({ req });
  if (session) {
    const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
      headers: {
        'x-user-session': JSON.stringify(session),
      },
    });
    return {
      props: {
        addresses: data?.addresses,
        session
      },
    };
  }
};

export default function ShippingPage({ addresses,session }) {
  return <Shipping addresses={addresses} session={session}/>;
}
