import Register from "@/components/auth/Register";
import { parseCallbackUrl } from "@/helpers/helpers";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: context.query.callbackUrl
          ? parseCallbackUrl(context.query.callbackUrl)
          : "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
