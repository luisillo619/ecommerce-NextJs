import Login from "@/components/auth/Login";
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

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
