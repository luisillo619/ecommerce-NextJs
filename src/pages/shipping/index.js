import Profile from "@/components/auth/Profile";
import Shipping from "@/components/cart/Shipping";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${context.req?.cookies["next-auth.session-token"]}`,
    },
  });

  return {
    props: {
      addresses: data?.addresses,
    },
  };
};

export default function ShippingPage({ addresses }) {
  return <Shipping addresses={addresses} />;
}
