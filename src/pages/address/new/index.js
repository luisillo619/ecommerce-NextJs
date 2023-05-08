import NewAddress from "@/components/user/NewAddress";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

const NewAddressPage = ({ session }) => {
  return <NewAddress session={session} />;
};

export default NewAddressPage;
