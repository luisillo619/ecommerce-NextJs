import UpdateAddress from "@/components/user/UpdateAddress";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const { data } = await axios.get(`${process.env.API_URL}/api/address/${id}`, {
    headers: {
      Cookie: `next-auth.session-token=${context.req?.cookies["next-auth.session-token"]}`,
    },
  });

  return {
    props: {
      addressData: data?.address || null,
    },
  };
};

export default function UpdateAddressPage({ addressData }) {
  return <UpdateAddress addressData={addressData} />;
}
