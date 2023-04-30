import Shipping from "@/components/cart/Shipping";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({req}) => {
  const session = await getSession({ req });
  if (session) {
    const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
      headers: {
        "X-User-Id": session.user._id,
      },
    });
    return {
      props: {
        addresses: data?.addresses,
      },
    };
  }
};

export default function ShippingPage({ addresses }) {
  return <Shipping addresses={addresses} />;
}
